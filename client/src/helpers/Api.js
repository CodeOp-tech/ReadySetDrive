import Local from "./Local";

class Api {
  // Register a new user
  static async registerUser(username, email, password, confPassword) {
    let body = { username, email, password, confPassword };
    return await this._doFetch("/auth/register", "POST", body);
  }
  /**
   * Log in a user
   **/

  static async loginUser(username, password) {
    let body = { username, password };
    return await this._doFetch("/auth/login", "POST", body);
  }

  /**
   * Get all users
   **/

  static async getUsers() {
    return await this._doFetch("/users");
  }

  /**
   * Get data for user with ID 'user_id'
   **/

  static async getUser(user_id) {
    return await this._doFetch(`/users/${user_id}`);
  }

  static async getFav(user_id) {
    return await this._doFetch(`/favorite_roadtrips/${user_id}`);
  }
  /**
   * General purpose GET (for URLs like /members-only)
   **/

  static async getContent(url) {
    return await this._doFetch(url);
  }

  // GET all roadtrips

  static async getRoadtrips() {
    return await this._doFetch("/roadtrips");
  }

  //PATCH (mark roadtrip as complete)
  static async updateRoadtrip(roadtrip_id, completed) {
    return await this._doFetch(
      `/roadtrips/${roadtrip_id}/done`,
      "PATCH",
      completed
    );
  }

  //POST new stop
  static async addStop(newPlace) {
    return await this._doFetch("/stops", "POST", newPlace);
  }

  //DELETE stop
  // static async deleteStop(id) {
  //   return await this._doFetch(`/stops/${id}`, "DELETE", id);
  // // }
  // static async addFav(newFav) {
  //   return await this._doFetch(
  //     `/favorite_roadtrips/${user_id}/${roadtrips_id}`,
  //     "POST",
  //     newFav
  //   );
  // }

  //Post favs
  // static async addFav(user_id) {
  //   return await this._doFetch(`/favorite_roadtrips/${user_id}`, "POST");
  // }

  /**
   * Private method for internal use only
   **/

  static async _doFetch(url, method = "GET", body = null) {
    // Prepare fetch() options
    let options = {
      method,
      headers: {},
    };

    // Add token to headers if it exists in localStorage
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    // Add the body if one is supplied
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    // Do the fetch() and store the results in a "unified" myresponse obj
    //console.log(body);
    //console.log(options);
    let myresponse = { ok: false, data: null, status: 0, error: "" };
    try {
      let response = await fetch(url, options);
      myresponse.data = await response.json();
      myresponse.status = response.status;
      // console.log(response);
      if (response.ok) {
        myresponse.ok = true;
      } else {
        myresponse.error = myresponse.data.error;
      }
    } catch (err) {
      myresponse.error = err.message;
    }

    return myresponse;
  }
}

export default Api;
