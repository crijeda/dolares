Cards.attachRoles('cards');

Roles.defaultRole.allow('cards.remove', function(userId, doc) {
  return userId === doc.ownerId;
});
