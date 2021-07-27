import CustomException from "exceptions/CustomException"

/**
 * Regex Match Exception
 * @extends CustomException
 */
 class RegexMatchException extends CustomException {
     /**
      * @param {string} parameterName - Name of the parameter undergoing regex match
      * @param {string} parameterValue - Value of the paremeter undergoing regex match
      * @param {string} regex - The regex pattern being used in check
      */
    constructor(name, string, regex) {
        super(`The value ${string} of ${name} parameter, does not match the regex ${regex}`);
    }
}

export default RegexMatchException;