export const testJWKArray = [
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

export const testCorrectlyFormattedJWKObject = {
    "kid1": {
        item1: "item1",
        item2: "item2"
    }, 
    "kid2":{
        item3: "item3",
        item4: "item4"
    }
};

export const malformedBase64EncodedJSON = "ewogICAgInByb3AiOiAidmFsdWUxIiwKICAgICJwcm9wMiI6ICJ2YWx1ZTIiCg==";

export const test64EncodedJSON = "ewogICAgInByb3AiOiAidmFsdWUxIiwKICAgICJwcm9wMiI6ICJ2YWx1ZTIiCn0=";
export const test64DecodedJSON = {
    "prop": "value1",
    "prop2": "value2"
};

export const testJWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.
yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw`;

export const testDecodedJWTHeader = { alg: 'HS256', typ: 'JWT' };

export const testDecodedJWTPayload = {
    iss: 'toptal.com',
    exp: 1426420800,
    'http://toptal.com/jwt_claims/is_admin': true,
    company: 'Toptal',
    awesome: true
}