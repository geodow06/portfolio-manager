import { jwkArrayToObject, base64DecodeJSON } from "utils";
import chai from 'chai';

const dummyJWKArray = [
    {
        kid: "kid1", 
        item1: "item1",
        item2: "item2"
    },
    {
        kid: "kid2", 
        item3: "item3",
        item4: "item4"
    }
];
const correctlyFormattedJWKObject = {
    "kid1": {
        item1: "item1",
        item2: "item2"
    }, 
    "kid2":{
        item3: "item3",
        item4: "item4"
    }
};

describe('tokenUtils unit tests', () => {
    describe('formatJWKArray tests', () => {
        it('Should correctly format JWK array to object', () => {
            chai.expect(jwkArrayToObject(dummyJWKArray)).to.deep.equal(correctlyFormattedJWKObject);
        });
    });
    describe('base64DecodeJSON test', () => {
        it('Should return empty object for malformed JSON', () => {
            const emptyObject = {};
            chai.expect(base64DecodeJSON(emptyObject)).to.be.empty;
        });
    });
});