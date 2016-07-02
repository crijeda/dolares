Accounts.attachSchema({
  alias: {
    type: String,
    label: 'Alias'
  },
  bank: {
    type: String,
    label: 'Banco',
    allowedValues: _.keys(bankList),
    autoform: {
      options: bankList
    }
  },
  type: {
    type: String,
    label: 'Tipo de cuenta',
    allowedValues: _.keys(accountTypes),
    autoform: {
      options: accountTypes
    }
  },
  number: {
    type: String,
    label: 'Numero de cuenta'
  },
  name: {
    type: String,
    label: 'Nombre del dueño'
  },
  rut: {
    type: String,
    label: 'Rut'
  },
  ownerId: {
    type: String,
    autoform: {
      omit: true
    },
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return { $setOnInsert: this.userId };
      } else {
        this.unset();
      }
    }
  }
});
