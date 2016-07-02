Accounts.attachRoles('accounts');

Roles.defaultRole.allow('accounts.insert', function(userId, doc) {
  return userId === doc.ownerId;
});

Roles.defaultRole.allow('accounts.update', function(userId, doc, fieldNames, modifier) {
  if (_.contains(fieldNames, 'ownerId')) {
    return false;
  }
  return userId === doc.ownerId;
});

Roles.defaultRole.allow('accounts.remove', function(userId, doc) {
  return userId === doc.ownerId;
});
