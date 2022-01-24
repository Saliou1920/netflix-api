class CustomAPIError extends Error {
  constructor(message, status) {
    super(message);
  }
}
module.exports = CustomAPIError;
