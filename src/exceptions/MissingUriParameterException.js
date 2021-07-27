import CustomException from "./CustomException";

/**
 * Missing Parameter Exception
 * @extends {CustomException}
 */
 class MissingUriParameterException extends CustomException {
     /**
      * 
      * @param {string} parameter - name or the missing parameter
      * @param {string} uri - The request Uri
      */
    constructor(parameter, uri) {
        super(`Parameter ${parameter} not found in uri`);
        this.data = { parameter, uri };
    }
}

export default MissingUriParameterException;