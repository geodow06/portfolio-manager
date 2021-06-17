import { Buffer } from 'buffer';
import { verifyToken } from "utils/auth/tokenUtils";

export default class JwtToken {

	constructor(token, type) {
		// Assign object
		this.type = type;
		this.jwtToken = token || '';
		let { header, payload } = this.decodeToken();
		this.header = header;
		this.payload = payload;
	}

	getExpiration() {
		return this.payload.exp;
	}

	getIssuedAt() {
		return this.payload.iat;
	}

	decodeToken() {
		const encodedComponentsArray = this.jwtToken.split(".");
		return {
			header: this.base64DecodeJson(encodedComponentsArray[0]),
			payload: this.base64DecodeJson(encodedComponentsArray[1])
		};
	}

	base64DecodeJson ( encodedObject ) {
		try {
			return JSON.parse(Buffer.from(encodedObject, 'base64').toString('utf8'));
		} catch (error) {
			console.log(error)
			return {};
		}
	}

	isValid() {
		return verifyToken(this.token) ? true : false;
	}
}