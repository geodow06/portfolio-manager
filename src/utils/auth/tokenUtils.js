import JwtToken from "auth/JwtToken";
import { create, verify } from "njwt";

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

export const encodeToken = ( claims, secret, alg = "HS512" ) => {
    //   base64 encoding i.e. compact function not working for RS2 Algs
    const jwt = create(claims, secret, "HS512");
    return jwt.compact();
}

// Returns JWT object
export const decodeToken = ( encodedToken ) => {
    return new JwtToken(encodedToken);
}

export const verifyToken = (encodedToken, secret, alg) => {
    return verify(encodedToken, secret, alg);
}

export const getMockAccessToken = () => {
    return encodeToken( dummyAccessClaims, "dummy" );
}

export const getMockIdToken = () => {
    return encodeToken( dummyIdClaims, "dummy" );
}

export const getMockRefreshToken = () => {
    return dummyRefresh;
}

// TODO base64 encoder

// TODO base 64 decoder and implement in JwtToken class "decodePayload"
  