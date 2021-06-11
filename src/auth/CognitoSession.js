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

        console.log(accessToken);
        console.log(idToken);
        if (!accessToken || !idToken) {
            console.log("Cognito token is invalid")
            return false;
        }
        console.log("Cognito token valid")
        return true;
    }
}