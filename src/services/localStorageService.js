class LocalStorageService {

    ls = window.localStorage;

    setItem(key, value) {
        value = JSON.stringify(value);
        this.ls.setItem(key, value);
        return true;
    }

    getItem(key) {
        let value = this.ls.getItem(key);

        try {
          return JSON.parse(value);
        } catch (error) {
          console.log(error);
          return null;
        }
    }

    getToken() {
      return this.getItem("jwt_token");
    }

    getSession() {
      return this.getItem("session_token");
    }

    removeItem(key) {
      this.ls.removeItem(key)
    }

    clearLocalStorage() {
      this.ls.removeItem("session_token");
      this.ls.removeItem("jwt_token");
      this.ls.removeItem("authenticated_user");
      this.ls.removeItem("data");
    }
}

export default new LocalStorageService();