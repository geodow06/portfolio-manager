import { Buffer } from 'buffer';


export default class JwtToken {

	constructor(token) {
		// Assign object
		this.jwtToken = token || '';
		this.payload = this.decodePayload();
	}

	getJwtToken() {
		return this.jwtToken;
	}

	getExpiration() {
		return this.payload.exp;
	}

	getIssuedAt() {
		return this.payload.iat;
	}

	decodePayload() {
		const payload = this.jwtToken.split('.')[1];
		try {
			return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
		} catch (err) {
			return {};
		}
	}

	isValid() {
		// If current time is below expiry token is valid
		if (Math.round(Date.now() / 1000) < this.payload.exp) {
			return true;
		}

		return false;
	}
}