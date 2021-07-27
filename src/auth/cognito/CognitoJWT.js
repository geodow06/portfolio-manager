import { decodeJWTHeaderAndPayload } from "utils";
import { ClassInstantiationException } from "exceptions";
import { validateCognitoJwt } from "services/cognitoService";

class CognitoJWT {
	/**
	 * Create CognitoJWT
	 * @param {string} token - Raw Base64 encoded JWT
	 * @throws {ClassInstantiationError}
	 */
	constructor(token) {
		/** 
		 * Raw Encoded JWT token
		 * @type {string}
		 */
		this.encodedToken = token || '';
		let { header, payload } = decodeJWTHeaderAndPayload(token);
		/** 
		 * Decoded JWT header
		 * @type {object}
		 */
		this.decodedHeader = header;
		/**
		 * Decoded JWT payload
		 * @type {object}
		 */
		this.decodedPayload = payload;

		// If verification fails throw 
		try {
			validateCognitoJwt(this);
		} catch(error) {
			throw new ClassInstantiationException(this.constructor.name, error);
		}
	}

	/**
     * Get the token expiration time seconds since epoch from decoded payload.
	 * @method
     * @return {string} The x value.
     */
	getExpiration() {
		return this.decodedPayload.exp;
	}
	/**
     * Get the token issued at time seconds since epoch from decoded payload.
	 * @method
     * @return {string} The x value.
     */
	getIssuedAt() {
		return this.decodedPayload.iat;
	}

	/**
     * Return true if token is valid i.e. verified and not expired
	 * @method
     * @return {boolean}
     */
	isValid() {
		try {
			validateCognitoJwt(this.token);
		} catch(error) {
			console.log(error);
			return false;
		}
		return true;
	}
}

export default CognitoJWT;