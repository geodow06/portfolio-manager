import localStorageService from "./localStorageService";

class AuthService {


    user = {
        username:"JohnDoe06",
        token:"dummy",
        role: 'ADMIN'
    }

    loginWithUsernameAndPassword = (username, password) => {
        // TODO Add axios API calls
        // Password confirmed
        if(password === "go") {
            // API returns token
            // Set token and user details
            let user = {
                username:username,
                role:'ADMIN',
                token: "correctdummy"
            }
            // Set token in local storage
            this.setSession(user.token);
            // Set user in local storage
            this.setUser(user);

            return user;
        } else {
            throw "Failed to authenticate";
        }
    }

    loginWithToken = () => {
        // Check local storage for token
        if( localStorageService.getToken() !== "correctdummy") {
            throw "Token invalid";
        }
        console.log("Authenticated")
    }
    
    logout = () => {
        this.setSession(null);
        this.removeUser();
    }

    // Set accepted token in local storage
    setSession = token => {
        if (token) {
          localStorage.setItem("jwt_token", token);
        } else {
          localStorage.removeItem("jwt_token");
        }
    };

    // Save user to localstorage
    setUser = (user) => {    
        localStorageService.setItem("auth_user", user);
    }
    // Remove user from localstorage
    removeUser = () => {
        localStorage.removeItem("auth_user");
    }
   
}

export default new AuthService();