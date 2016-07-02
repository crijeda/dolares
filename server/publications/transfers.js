Meteor.publish('transfer', function(transferId) {
  check(transferId, String);
  return Transfers.find({ ownerId: this.userId, _id: transferId }, { fields: { ownerId: 1, status: 1, progress: 1, progressMessage: 1 } });
});
