/** @module utils/auth/tokenUtils */

// TODO - Remove dummy/mock data creation from tokenUtils module
import CognitoSession from "auth/cognito/CognitoSession";
import jwt from "jsonwebtoken";
import { Buffer } from 'buffer';
import { JWTVerificationException } from "exceptions";

let dummyAccessClaims = {
    "sub": "dummy",
    "cognito:groups": [
      "ROLE_EMPLOYEE"
    ],
    "token_use": "dummy",
    "scope": "dummy",
    "auth_time": "dummy",
    "iss": "dummy",
    "exp": 1800000000,
    "iat": 1600000000,
    "version": 3,
    "jti": "dummy",
    "client_id": "dummy",
    "username": "dummy"
}

let dummyIdClaims = {
    "at_hash": "dummy",
    "sub": "dummy",
    "cognito:groups": [
     "ROLE_EMPLOYEE"
    ],
    "email_verified": true,
    "iss": "dummy",
    "cognito:username": "dummy",
    "aud": "dummy",
    "event_id": "dummy",
    "token_use": "dummy",
    "auth_time": "dummy",
    "phone_number": "dummy",
    "exp": 1800000000,
    "iat": 1600000000,
    "email": "dummy"
   }

let dummyRefresh = "cmVmcmVzaA==" // "refresh"

export const signToken = (payload, secretOrPrivateKey) => {
    return jwt.sign(payload, secretOrPrivateKey);
}

// TODO add typedef for JWT class
/** 
 * Verifies token and returns decrypted payload if succesful
 * else throws error
 * @method
 * @param {object} token - CognitoJWT class object containing payload to be verified
 * @param {string} secretOrKey - Private key or secret with which to attempt verification
 * @return {object}
 */
export const verifyToken = (base64EncodedJWT, secretOrKey) => {
    try {
    return jwt.verify(base64EncodedJWT, secretOrKey);
    } catch(error) {
     throw new JWTVerificationException(error);
    }
}


export const getMockAccessToken = () => {
    return signToken( dummyAccessClaims, "dummy" );
}

export const getMockIdToken = () => {
    return signToken( dummyIdClaims, "dummy" );
}

export const getMockRefreshToken = () => {
    return dummyRefresh;
}

export const getMockCognitoSession = () => {
    return new CognitoSession({
        access_token : getMockAccessToken(),
        expires_in: "dummy",
        id_token : getMockIdToken(),
        refresh_token : getMockRefreshToken(),
        token_type: "Bearer"
    })
}

/** 
 * Transforms JWK Object Array to Object with child objects with corresponding kid as root prop
 * @method
 * @param {Object[]} keyArray - JWK Array
 * 
 * Example input - [{kid:"firstKeyId", ...remainingProps}, {kid: "secondKeyId", ...remainingProps}, ....]
 * 
 * @return {Object} - Object
 * 
 * Example output - {kid1: {...remainingProps}, kid2: {...remainingProps}, ....} 
 */
export const jwkArrayToObject = keyArray => {
    return keyArray.reduce(
        (result, item) => {
            let { kid, ...remaining } = item;
            result[kid] = remaining;
            return result;
        }, {});
}

// TODO base64 encoder

/**
 * @method
 * @param {string} encodedJsonObject
 * @returns {object} decoded JSON object
 */
export const base64DecodeJSON = encodedObject => {
    try {
        return JSON.parse(Buffer.from(encodedObject, 'base64').toString('utf8'));
    } catch (error) {
        console.log(error)
        return {};
    }
}

/**
 * Decodes the token header and payload
 * @method
 * @param {object} encodedJWTToken - The encoded JWT token
 * @return {object} - object containing the decoded header and payload
 */
export const decodeJWTHeaderAndPayload = encodedJWTToken => {
    const encodedComponentsArray = encodedJWTToken.split(".");
    // TODO check for decoded array length
    return {
        header: base64DecodeJSON(encodedComponentsArray[0]),
        payload: base64DecodeJSON(encodedComponentsArray[1])
    };
}
  