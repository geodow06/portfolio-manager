import { verifyToken } from "utils";
import chai from 'chai';

describe('tokenUtils unit tests', () => {
    describe('verifyToken tests', () => {
        it('Should return signed token', () => {
            chai.expect(verifyToken()).equal("");
        });
    });
});