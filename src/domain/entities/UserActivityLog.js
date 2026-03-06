class UserActivityLog {
  constructor({ id, userId, activity, timestamp, metadata = {} }) {
    this.id = id;
    this.userId = userId;
    this.activity = activity;
    this.timestamp = timestamp || new Date();
    this.metadata = metadata;
  }

  validate() {
    if (!this.userId) throw new Error('User ID is required');
    if (!this.activity) throw new Error('Activity is required');
  }
}

module.exports = UserActivityLog;
