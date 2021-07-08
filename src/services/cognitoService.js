import {cognitoAxios} from "config/axios";
import axios from "axios";
import { verifyToken, JWKArrayToObject } from "utils";

class CognitoService {
    /**
    * @typedef CognitoToken
    * @property {string} access_token AwS cognito access token
    * @property {string} id_token AWS cognito id token
    * @property {string} refresh_token AWS Cognito Refresh token
    * @property {number} expires_in The time until token expires
    * @property {string} token_type - Token type
    */
    /**
     * Get cognito token using authorization code
     * @param {string} code - Cognito authorization code
     * @return {Promise{<ognitoToken>}
    */
    getToken = async code => {
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
        }).then(response => {
            console.log("HERE")
            console.log(response.data)
            return response.data});
    };

    // Gets JWKs from user pool to be used for jwt verification
    // Return Promise
    getJwks = () => {
        return new Promise((resolve, reject) => {
            axios.get(`${process.env.REACT_APP_COGNITO_JWKS_URI}`)
            .then(response => resolve(JWKArrayToObject(response.data.keys)))
            .catch(error => reject(error));
        });
    };

    // Verify Cognito JWT using secret generated from AWS Cognito provided JWKs
    // Return Promise
    validateCognitoJwt = async token => {
        let jwkToPem = require("jwk-to-pem");
        this.getJwks().then(keysObject => {
            return verifyToken(token, jwkToPem(keysObject[token.header.kid]));
        });
    };
}

export default new CognitoService();