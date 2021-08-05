import { 
    jwkArrayToObject, 
    base64DecodeJSON, 
    decodeJWTHeaderAndPayload,
    signToken,
    verifyToken
} from "utils";
import * as constants from "utils/auth/constants";
import chai from 'chai';
import { JWTVerificationException } from "exceptions";

describe('tokenUtils unit tests', () => {
    // formatJWKArray tests
    describe('formatJWKArray tests', () => {
        it('Should correctly format JWK array to object', () => {
            chai.expect(jwkArrayToObject(constants.testJWKArray)).to.deep.equal(constants.testCorrectlyFormattedJWKObject);
        });
    });

    // base64DecodeJSON tests
    describe('base64DecodeJSON tests', () => {
        it('Should return empty object for malformed JSON', () => {
            chai.expect(base64DecodeJSON(constants.malformedBase64EncodedJSON)).to.be.empty;
        });
        it('Should return object decoded object', () => {
            chai.expect(base64DecodeJSON(constants.test64EncodedJSON)).to.deep.equal(constants.test64DecodedJSON);
        });
    });

    // decodeJWTHeaderAndPayload tests
    describe('decodeJWTHeaderAndPayload tests', () => {
        const decodedToken = decodeJWTHeaderAndPayload(constants.testJWT);
        it('Should return oject with header and payload props', () => {
            chai.expect(decodedToken).to.have.keys('header', 'payload');
        });
        it('Should return an object with the JWT header correctly decoded', () => {
            chai.expect(decodedToken.header).to.include(constants.testDecodedJWTHeader);
        });
        it('Should return an object with the JWT payload correctly decoded', () => {
            chai.expect(decodedToken.payload).to.include(constants.testDecodedJWTPayload);
        });
    });

    // signToken tests
    describe('signToken tests', () => {
        it('Should return a base64Encoded JWT token of the correct form', () => {
            const signedToken = signToken(constants.testDecodedJWTPayload, constants.test256Secret);
            chai.assert.match(signedToken, constants.jwtRegex);
        })
    });

    // verifyToken tests
    describe('verifyToken tests', () => {
        it('Should return the JWT payload without iat for correct key', () => {
            const signedToken = signToken(constants.testDecodedJWTPayload, constants.test256Secret);
            console.log(signedToken)
            const verifyResponse = verifyToken(signedToken, constants.test256Secret);
            const verifiedPayload = constants.testDecodedJWTPayload;
            chai.expect(verifyResponse).to.deep.equal(verifiedPayload);
        });
        it('Should throw a new JWTVerificationError for incorrect key', () => {
            const signedToken = signToken(constants.testDecodedJWTPayload, constants.test256Secret);
            const testFunciton = () => { verifyToken(signedToken, "incorrectkey") }
            chai.expect(testFunciton).to.throw(JWTVerificationException, /invalid signature/);
        });
    });
});