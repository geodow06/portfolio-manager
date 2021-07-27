import { parseCallBackUri } from "utils";
import { RegexMatchException, MissingUriParameterException } from "exceptions";
import chai from 'chai';
const validCode = "972de19d-6f21-4b92-9a17-4e21f5de1ed8";
const malformedCode = "972de9d-6f21-4b92-9a17-4e21f5de1ed8";

describe('oAuthUtils unit tests', () => {
    describe('parseCallBackUri tests', () => {
        it('Should return code for correctly formatted uri', () => {
            chai.expect(parseCallBackUri(`${process.env.REACT_APP_COGNITO_CALLBACK_URL}?code=${validCode}`)).equal(validCode);
        });
        it('Should throw MissingUriParameterException if no code parameter in uri', () => {
            chai.should().Throw(() => 
                parseCallBackUri(`${process.env.REACT_APP_COGNITO_CALLBACK_URL}?core=${validCode}`), 
                MissingUriParameterException
            );
        });
        it('Should throw RegexMatchException if code parameter is of incorrect form', () => {
            chai.should().Throw(() => 
                parseCallBackUri(`${process.env.REACT_APP_COGNITO_CALLBACK_URL}?code=${malformedCode}`), 
                RegexMatchException
            );
        });
    })
});