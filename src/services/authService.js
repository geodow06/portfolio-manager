import localStorageService from "./localStorageService";

class AuthService {

    user = {
        username:"JohnDoe06",
        token:"correct-dummy",
        password:"INCORRECT"
    }

    loginWithUsernameAndPassword = (username, password) => {
        // Add axios API calls
        if(password === "CORRECT") {
            console.log("Password correct")
            // Set token
            this.setSession(this.user.token);

            // Set user in local storage
            this.setUser(this.user);

            return this.user;
        } else {
            throw "Failed to authenticate";
        }
    }

    // TODO
    // loginWithToken = () => {}
    

    logout = () => {
        this.setSession(null);
        this.removeUser();
    }

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