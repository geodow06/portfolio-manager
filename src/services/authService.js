import localStorageService from "./localStorageService";
import { getMockAccessToken, getMockIdToken, getMockRefreshToken, getMockCognitoSession } from "utils/auth/tokenUtils";
import CognitoSession from "auth/CognitoSession";
class AuthService {

    // Mock authenticated user response
    dummyAuthenticatedUser = {
        username:"JohnDoe",
        role:"ADMIN",
        token: {
            access_token : getMockAccessToken(),
            expires_in: "dummy",
            id_token : getMockIdToken(),
            refresh_token : getMockRefreshToken(),
            token_type: "Bearer"
        }
    };
    
    // TODO should be moved to tokenUtils
    // Returns CognitoToken object or false otherwise
    validateCognitoSession = (token) => {
        if (token) {
            return new CognitoSession(token);
        }

        return false;
    }

    // Returns CognitoToken object or false otherwise
    validateStoredCognitoSession = () => {
        let storedSession = localStorageService.getSession();
        return this.validateCognitoSession(storedSession);
    }

    // Set the session token in local storage
    setSession = session => {
        if (session) {
            localStorageService.setItem("session_token", session);
        } else {
            console.log("error setting session")
            localStorageService.removeItem("session_token");
        }
    }

    // TODO
    getUserDataFromSession = session => {
        return this.dummyAuthenticatedUser;
    }

    // If session is valid
    // Return Promise to get authenticated user data
    // Else return null promise
    // if more than one provider implement switch
    loginWithCognitoSession = async (token, provider) => {
        // If token is passed validate
        if ( token ) {
            let cognitoSession = this.validateCognitoSession(token);
            if(cognitoSession) {
                this.setSession(token);
                const authUser = this.getUserDataFromSession(cognitoSession)
                return Promise.resolve(authUser);
            }
        } 
        let storedCognitoSession = this.validateStoredCognitoSession();
        // If no token passed attempt to validate current session
        if ( storedCognitoSession ) {
            // Return the promise of function to get user data
            const authUser = this.getUserDataFromSession(storedCognitoSession);
            return Promise.resolve(authUser);
        }
        // Return null data to promise
        return Promise.resolve(null);
    }

    loginWithUsernameAndPassword = (username, password) => {
        // TODO Add axios API calls
        // Password confirmed
        if(password === "go") {
            // API returns token
            // Set token and user details
            let mockCognitoSession = getMockCognitoSession();
            // let user = {...this.dummyAuthenticatedUser, username}
            // Set token in local storage
            const authUser = this.getUserDataFromSession(mockCognitoSession);
            
            this.setSession(authUser.token);
            // Set user in local storage
            this.setUser(authUser);

            return authUser;
        } else {
            // Create error object
            throw "Password Incorrect";
        }
    };

    // Save user to localstorage
    setUser = (user) => {    
        localStorageService.setItem("auth_user", user);
    };
    // Remove user from localstorage
    removeUser = () => {
        localStorageService.removeItem("auth_user");
    };
   
}

export default new AuthService();