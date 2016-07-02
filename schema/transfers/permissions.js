Transfers.attachRoles('transfers');

Roles.defaultRole.allow('transfers.insert', function(userId, doc) {
  return userId === doc.ownerId;
});
