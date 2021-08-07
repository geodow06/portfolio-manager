import { RegexMatchException, MissingUriParameterException } from "exceptions";
export const parseCallBackUri = href => {
    // Return code parameter from callback uri
    let indexOf = href.lastIndexOf('code=');
    // If code= does not exist in uri throw NoCodeParameterError
    if (indexOf === -1) {

        throw new MissingUriParameterException("Callback Code", href);
    }
    // Get code from uri
    let code = href.slice(indexOf + 5);
    // Check code is of correct form if not throw InvalidFormError
    const callbackCodeRegex = /^[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}$/
    if (!code.match(callbackCodeRegex)) {
        throw new RegexMatchException("Callback code", code, callbackCodeRegex);
    }
    // Return code
    return code;
};