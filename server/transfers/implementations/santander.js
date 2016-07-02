var accountOrigin = process.env.SANTANDER_ORIGIN;
var accountRut = process.env.SANTANDER_RUT;
var accountPassword = process.env.SANTANDER_PASSWORD;
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var numbers = ['1', '2', '3', '4', '5'];
var coordenatesCard = {};
_.each(process.env.SANTANDER_CARD.split(','), function(number, index) {
  var letterIndex = index % letters.length;
  var numberIndex = Math.floor(index / letters.length);
  coordenatesCard[letters[letterIndex] + numbers[numberIndex]] = number;
});

var serialize = function(obj) {
  var str = "";
  for (var key in obj) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str;
}

santanderMakeTransfer = function(info, onProgress) {
  console.log(info);
  check(info, {
    bankId: String,
    accountTypeId: String,
    rut: String,
    name: String,
    amount: Number,
    account: String,
    transferId: String
  });

  onProgress(10, 'Empezando transferencia');

  //return true;

  //throw new Meteor.Error('no-funds', 'No funds to make transaction');

  var cookies = 'AspxAutoDetectCookieSupport=1;'

  var firstResponse = HTTP.get('https://www.santandermovil.cl/iphone/Default.aspx?AspxAutoDetectCookieSupport=1', {
    headers: {
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'
    }
  });

  console.log('First', firstResponse);

  if (firstResponse.statusCode != 200) {
    console.log('error on first request', firstResponse);
    return firstResponse;
  }

  onProgress(30, 'Conectando con el banco');

  _.each(firstResponse.headers['set-cookie'], function(setCookie) {
    var cookie = setCookie.split(';')[0] + ';';
    cookies += cookie;
  });

  var loginResponse = HTTP.post('https://www.santandermovil.cl/iphone/BankingServices.Login.ashx?AspxAutoDetectCookieSupport=1', {
    headers: {
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'
    },
    params: {
      rut_zip: accountRut,
      password_zip: accountPassword
    }
  });

  console.log('Login', loginResponse);

  if (loginResponse.statusCode != 200) {
    console.log('error on login request', loginResponse);
    return loginResponse;
  }

  onProgress(50, 'Emepezando Transferencia');

  _.each(firstResponse.headers['set-cookie'], function(setCookie) {
    var cookie = setCookie.split(';')[0] + ';';
    cookies += cookie;
  });

  var startTransferResponse = HTTP.post('https://www.santandermovil.cl/iphone/tef_3ros2.aspx', {
    headers: {
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'
    },
    params: {
      _selectedBankId: info.bankId,
      _selectedAccountTypeId: info.accountTypeId,
      _selectedOriginNumber: accountOrigin,
      _rut_zip: info.rut,
      _name: info.name,
      _amount_zip: info.amount,
      _account_zip: info.account,
      _emailDest: 'crijeda@gmail.com'
    }
  });

  console.log('Start', startTransferResponse);

  if (startTransferResponse.statusCode != 200) {
    console.log('error on start transfer request', startTransferResponse);
    return startTransferResponse;
  }

  onProgress(70, 'Realizando Transferencia');

  _.each(firstResponse.headers['set-cookie'], function(setCookie) {
    var cookie = setCookie.split(';')[0] + ';';
    cookies += cookie;
  });

  var parser = cheerio.load(startTransferResponse.content);
  var coordenate1 = coordenatesCard[parser('#pwdsp0').text()];
  var coordenate2 = coordenatesCard[parser('#pwdsp1').text()];
  var coordenate3 = coordenatesCard[parser('#pwdsp2').text()];

  var requestContent = serialize({
    _originEmail: 'crijeda@gmail.com',
    _targetEmail: 'crijeda@gmail.com',
    _comments: '#' + info.transferId,
    _version_tef: 'V2'
  });
  requestContent += '&_pwd_zip=' + coordenate1;
  requestContent += '&_pwd_zip=' + coordenate2;
  requestContent += '&_pwd_zip=' + coordenate3;

  var makeTransferResponse = HTTP.post('https://www.santandermovil.cl/IPhone/tef_3ros3_5.aspx', {
    headers: {
      'Cookie': cookies,
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'
    },
    content: requestContent
  });

  console.log('Finish', makeTransferResponse);

  if (makeTransferResponse.statusCode != 200) {
    console.log('error on make transfer request', makeTransferResponse);
    return makeTransferResponse;
  }

  return true;
}
