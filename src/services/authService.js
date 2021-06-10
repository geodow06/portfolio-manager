import JwtToken from "auth/JwtToken";
import localStorageService from "./localStorageService";
import { getMockAccessToken, decodeToken, getMockIdToken, getMockRefreshToken } from "utils/auth/tokenUtils";

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

    loginWithUsernameAndPassword = (username, password) => {
        // TODO Add axios API calls
        // Password confirmed
        if(password === "go") {
            // API returns token
            // Set token and user details
            let user = {...this.dummyAuthenticatedUser, username}
            // Set token in local storage
            this.setSession(user.token);
            // Set user in local storage
            this.setUser(user);

            return user;
        } else {
            throw "Failed to authenticate";
        }
    };
    
    validateToken = (token) => {
        const accessToken = token ? new JwtToken(token.access_token) : null;
        return accessToken && accessToken.isValid()
    }

    validateSessionToken = () => {
        let session = localStorageService.getSession();
        if (this.validateToken(session)) {
            return {valid: true, session: session}
        }
        return {valid: false, error: "Not session invalid"}
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
    getUserDataFromToken = token => {
        return this.dummyAuthenticatedUser;
    }

    // If session is valid
    // Return Promise to get authenticated user data
    // Else return null promise
    loginWithSessionToken = async token => {
        // If token is passed validate
        if(token) {
            if(this.validateToken(token)) {
                this.setSession(token);

                const authUser = this.getUserDataFromToken(token)
                return Promise.resolve(authUser);
            }
        } 
        // If no token passed attempt to validate current session
        else if (this.validateSessionToken().valid) {
            // Return the promise of function to get user data
            const authUser = this.getUserDataFromToken(this.validateSessionToken().session)
            return Promise.resolve(authUser);
        }
        // Return null data to promise
        return Promise.resolve(null);
    }

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