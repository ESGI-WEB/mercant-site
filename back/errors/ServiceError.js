class ServiceError extends Error {
  constructor(errors) {
    super("Service error");
    if (typeof errors === "string") {
      errors = [errors];
    }
    this.errors = errors;
  }
}

module.exports = ServiceError;
