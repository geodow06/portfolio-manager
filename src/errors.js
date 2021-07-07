export class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class RegexMatchError extends CustomError {
    constructor(name ,string, regex) {
        super(`The ${name}, ${string}, does not match the regex ${regex}`);
    }
}

export class MissingParameterError extends CustomError {
    constructor(parameter, uri) {
        super(`Parameter ${parameter} not found in uri`);
        this.data = { parameter, uri };
    }
}
