/** @module services/cognitoService */

import {cognitoAxios} from "config/axios";
import axios from "axios";
import { verifyToken, jwkArrayToObject } from "utils";
 
/**
 * Get cognito token using authorization code
 * @method
 * @param {string} code - Cognito authorization code
 * @returns {Promise} Promise containing the returned Cognito Session Token from AWS 
 */
export const getToken = async code => {
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

/**
 * Get JWK Object Array from oAuth provider
 * @method
 * @return {Promise} Promise object containing keys with unique kid as root prop
 */
export const getJWKs = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_COGNITO_JWKS_URI}`)
            .then(response => resolve(jwkArrayToObject(response.data.keys)))
            .catch(error => reject(error));
    });
}

/**
 * Verify Cognito JWT and return decrypted payload
 * @method
 * @param {object} token - unverified JWT token
 * @return {Promise} Promise object containing the decrypred Cognito JWT payload
 */
export const validateCognitoJwt = token => {
    let jwkToPem = require("jwk-to-pem");

    return new Promise((resolve, reject) => {
        getJWKs().then(keysObject => {
            resolve(verifyToken(token.encodedToken, jwkToPem(keysObject[token.decodedHeader.kid])));
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}
