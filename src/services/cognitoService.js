import {cognitoAxios} from "config/axios";
import axios from "axios";
import { verifyToken } from "utils";

class CognitoService {
    
    getToken = async (code) => {
        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code")
        params.append("client_id", process.env.REACT_APP_COGNITO_CLIENT_ID)
        params.append("code", code)
        params.append("redirect_uri", process.env.REACT_APP_COGNITO_CALLBACK_URL)
        
        return cognitoAxios({
            method: "POST",
            url: `${process.env.REACT_APP_COGNITO_DOMAIN}/oauth2/token`,
            headers:{
                'Authorization': `Basic ${process.env.REACT_APP_COGNITO_ENCODED_AUTH}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: params
        }).then(response => response.data);
    }

    // Added to get verification
    getJwks = async () => {
        // Gets JWKs from user pool to be used for jwt verification
        let keyArray = await axios.get(`${process.env.REACT_APP_COGNITO_JWKS_URI}`)
            .then(response => response.data.keys);
        // Transforms returned keys array into object with each key ids as keys
        // i.e. {kid1: {...dataOfOne}, kid2: {...dataOfTwo}}
        return Promise.resolve(keyArray.reduce(
            function(result, item) {
                let { kid, ...remaining } = item;
                result[kid] = remaining;
                return result;
            }, {}));
    }

    validateCognitoJwt = async token => {
        let jwkToPem = require("jwk-to-pem");
        // TODO clean up Promises
        let keysObject = await this.getJwks();
        let jwk = keysObject[token.header.kid];
        return verifyToken(token, jwkToPem(jwk))
    }
}

export default new CognitoService();