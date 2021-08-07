import CustomException from "exceptions/CustomException";
/**
 * Class Instatiation Exception
 * @extends CustomException
 */
 class ClassInstantiationException extends CustomException {
     /**
	 * Create CognitoJWT
	 * @param {string} className -  name of the class being instantiated
     * @param {string} error - the error which caused this exception
	 */
    constructor(className, error) {
        super(`Unable to instantiate class, ${className} due to the following error in constructor: ${error}`)
    }
}

export default ClassInstantiationException;