/**
 * Custom Exception
 * @extends Error
 */
 class CustomException extends Error {
     /**
      * 
      * @param {string} message - Message to be displayed with exception
      */
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomException;