import JwtToken from "auth/JwtToken";
import CognitoSession from "auth/CognitoSession";
import jwt from "jsonwebtoken";

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

// Returns JWT object
export const decodeToken = ( encodedToken ) => {
    return new JwtToken(encodedToken);
}

export const verifyToken = (token, secretOrKey) => {
    try {
        return jwt.verify(token.jwtToken, secretOrKey);
    } catch (error) {
        console.log(error);
        return false;
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

// TODO base64 encoder

// TODO base 64 decoder and implement in JwtToken class "decodePayload"
  