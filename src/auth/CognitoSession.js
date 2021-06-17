import JwtToken from "auth/JwtToken";
import cognitoService from "services/cognitoService";

export default class CognitoSession {
    constructor (cognitoToken) {
        this.accessToken = new JwtToken(cognitoToken.access_token, "access");
        this.idToken = new JwtToken(cognitoToken.id_token, "id");
        this.refreshToken = cognitoToken.refresh_token;
    }

    isValid = async () => {
        let accessToken = {}
        let idToken = {}
        accessToken = await cognitoService.validateCognitoJwt(this.accessToken).then(a => a);   
        idToken = await cognitoService.validateCognitoJwt(this.idToken).then(i => i);

        if (!accessToken || !idToken) {
            console.log("Cognito token is invalid")
            return false;
        }
        console.log("Cognito token valid")
        return true;
    }

    getIdProperty = (propertyName) => {
        return this.idToken.payload[propertyName];
    }

    getUserDetails = () => {
        return {
            roles: this.getIdProperty("cognito:groups"), 
            username: this.getIdProperty("cognito:username"), 
            phoneNumber: this.getIdProperty("phone_number"), 
            email: this.getIdProperty("email")
        };
    }
}