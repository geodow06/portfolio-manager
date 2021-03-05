class localStorageService {

    ls = window.localStorage

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
          console.log(error)
          return null;
        }
    }

    getToken() {
      let value = this.ls.getItem("jwt_token");
      return value;
    }
}

export default new localStorageService();