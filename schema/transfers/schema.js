Transfers.attachSchema({
  amount: { // in usd cents
    type: Number
  },
  cardId: {
    type: String
  },
  accountId: {
    type: String
  },
  card: {
    type: Object,
    blackbox: true,
    optional: true
  },
  account: {
    type: Object,
    blackbox: true,
    optional: true
  },
  charge: {
    type: Object,
    blackbox: true,
    optional: true
  },
  status: {
    type: String,
    allowedValues: ['pending', 'running', 'error', 'success'],
    autoValue: function() {
      if (this.isInsert) {
        return 'pending';
      } else if (this.isUpsert) {
        return { $setOnInsert: 'pending' };
      }
    }
  },
  progress: {
    type: Number,
    optional: true
  },
  progressMessage: {
    type: String,
    optional: true
  },
  ownerId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return this.userId;
      } else if (this.isUpsert) {
        return { $setOnInsert: this.userId };
      } else {
        this.unset();
      }
    }
  },
  dolarPrice: {
    type: Number,
    autoValue: function() {
      if (this.isInsert) {
        return dolarPrice;
      } else if (this.isUpsert) {
        return { $setOnInsert: dolarPrice };
      } else {
        this.unset();
      }
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    }
  }
});
