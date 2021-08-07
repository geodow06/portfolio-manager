import CognitoJWT from "auth/cognito/CognitoJWT";
import { validateCognitoJwt } from "services/cognitoService";

class CognitoSession {
    /**
	 * Create CognitoJWT
	 * @param {object} cognitoSessionToken - Cognito session token returned by cognito /token endpoint
	 */
    constructor (cognitoSessionToken) {
        /** 
		 * Cognito access ID token
		 * @type {CognitoJWT}
		 */
        this.accessToken = new CognitoJWT(cognitoSessionToken.access_token);
        /** 
		 * Cognito session ID token
		 * @type {CognitoJWT}
		 */
        this.idToken = new CognitoJWT(cognitoSessionToken.id_token);
        /** 
		 * Refresh token String
		 * @type {string}
		 */
        this.refreshToken = cognitoSessionToken.refresh_token;
    }

    /**
     * Check if the Cognito session is valid.
     * @method
     * @return {boolean} - True if cognito session is valid.
     */
    isValid = async () => {
        let accessToken = {}
        let idToken = {}
        accessToken = await validateCognitoJwt(this.accessToken).then(a => a);   
        idToken = await validateCognitoJwt(this.idToken).then(i => i);

        if (!accessToken || !idToken) {
            console.log("Cognito token is invalid")
            return false;
        }
        console.log("Cognito token valid")
        return true;
    }

    /**
     * Get prop from Cognito sessions ID token
     * @method
     * @return {string} The requested property from the cognito session Id token.
     * @private
     */
    getIdProperty = (propertyName) => {
        return this.idToken.decodedPayload[propertyName];
    }

    /**
     * Get the user details from the Cognito session
     * @method
     * @return {object} The user details belonging to Cognito session.
     */
    getUserDetails = () => {
        return {
            roles: this.getIdProperty("cognito:groups"), 
            username: this.getIdProperty("cognito:username"), 
            phoneNumber: this.getIdProperty("phone_number"), 
            email: this.getIdProperty("email")
        };
    }
}

export default CognitoSession;