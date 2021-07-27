import localStorageService from "./localStorageService";
import CognitoSession from "auth/cognito/CognitoSession";
class AuthService {
    
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

    loginWithUsernameAndPassword = (username, password) => {
        // TODO Add axios API calls
        // TODO Create error object
        throw "Invalid password";
    };
}

export default new AuthService();