import {cognitoAxios} from "config/axios";
import axios from "axios";
// const cognitoAuthService = {
//     // authorize,
//     token
// }
class CognitoService {
    
    getToken = async (code) => {
        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code")
        params.append("client_id", process.env.REACT_APP_COGNITO_CLIENT_ID)
        params.append("code", code)
        params.append("redirect_uri", process.env.REACT_APP_COGNITO_CALLBACK_URL)
        // console.log(`The code again ${code}`)
        
        return cognitoAxios({
            method: "POST",
            url: `${process.env.REACT_APP_COGNITO_DOMAIN}/oauth2/token`,
            headers:{
                'Authorization': `Basic ${process.env.REACT_APP_COGNITO_ENCODED_AUTH}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: params
        }).then(r => {return r.data});
    }

    
}

export default new CognitoService();