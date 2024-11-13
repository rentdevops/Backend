class UnAuthorised extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 300;
  }
}

module.exports = UnAuthorised;
