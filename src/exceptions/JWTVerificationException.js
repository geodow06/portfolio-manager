import CustomException from "./CustomException";

/**
 * JWT Verifcation Exception
 * @extends CustomException
 */
 class JWTVerificationException extends CustomException {
     /**
      * 
      * @param {string} error - The error that caused this exception
      */
    constructor(error) {
        super(`Unable to verify provided JWT token due to the following error: ${error}`)
    }
}

export default JWTVerificationException;