import localStorageService from "./localStorageService";
import { getMockAccessToken, getMockIdToken, getMockRefreshToken, getMockCognitoSession } from "utils/auth/tokenUtils";
import CognitoSession from "auth/CognitoSession";
class AuthService {

    // Mock authenticated session token
    dummySessionToken = {
            access_token : getMockAccessToken(),
            expires_in: "dummy",
            id_token : getMockIdToken(),
            refresh_token : getMockRefreshToken(),
            token_type: "Bearer"
    };
    
    // Set the session token in local storage
    setSession = session => {
        if (session) {
            localStorageService.setItem("session_token", session);
        } else {
            console.log("error setting session")
            localStorageService.removeItem("session_token");
        }
    }

    // If valid token create, validate and set the session
    // If no valid token attempt to do the same from local storage token
    // Else return false i.e. invalid session
    // If more than one provider implement switch
    loginWithCognitoSession = async (token, provider) => {
        
        if ( token ) {
            console.log("got here")
            return this.validateAndSetCognitoSession(token);
        }
        let storedSession = localStorageService.getSession();
        if(storedSession) {
            return this.validateAndSetCognitoSession(storedSession);
        }
        return false;
    }

    // Attempt to create a new CognitoSession from the provided token
    // If successful and valid set the token in local storage
    // Return the user details within the cognito session
    validateAndSetCognitoSession = sessionToken => {
        let cognitoSession = new CognitoSession(sessionToken);
        if (cognitoSession && cognitoSession.isValid()) {
            this.setSession(sessionToken);
            return Promise.resolve(cognitoSession.getUserDetails());
        }

        return Promise.resolve(false);
    }

    // Due to lack of kid in token header will not be able to be verified on refresh
    loginWithUsernameAndPassword = (username, password) => {
        // TODO Add axios API calls
        // Password confirmed
        if(password === "go") {
            // API returns token
            // Set token and user details
            let mockCognitoSession = getMockCognitoSession();
            // Set token in local storage
            const authUser = mockCognitoSession.getUserDetails();
            
            this.setSession(this.dummySessionToken);
            // Set user in local storage
            localStorageService.setItem("authenticated_user", authUser);

            return authUser;
        } 
        
        // TODO Create error object
        throw "Password Incorrect";
    };
}

export default new AuthService();