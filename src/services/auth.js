import axios from "axios";

// here we are just maing our code look more DRY. With every backend call we must deal with errors and success states. The idea of creating these kinds of services is to make our lives easier in the components
function internalServerError(err) {
  console.log("err:", err.response.data);
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    };
  }
  return {
    status: false,
    errorMessage: "Internal server error. Please check your server",
  };
}

function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

// creates a basic url for every request in this file
const authService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
});

export function login(credentials) {
  return authService
    .post("/login", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function getLoggedIn() {
  return authService
    .get(`session`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}

export function signup(credentials) {
  return authService
    .post("/signup", credentials)
    .then(successStatus)
    .catch(internalServerError);
}

export function logout() {
  return authService
    .delete("/logout", {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(successStatus)
    .catch(internalServerError);
}

// Add plant to wishtlist
export function addToWishlist(userId, plantId) {
  return authService
    .patch(`addToWishlist/${userId}`, { 'plantId': plantId })
    .then(res => res.data)
    .catch(err => console.log(err))
}

// Remove plant from wishlist
export function removeFromWishlist(userId, plantId) {
  return authService
    .patch(`removeFromWishlist/${userId}`, { 'plantId': plantId })
    .then(res => res.data)
    .catch(err => console.log(err))
}

// Populate information based on user
export function populateUserInformation(userId) {
  return authService
    .get(`/allInformationUser/${userId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// Remove plant from wishlist
export function addToPlantsHome(userId, plantId) {
  return authService
    .patch(`addToPlantsHome/${userId}`, { 'plantId': plantId })
    .then(res => res.data)
    .catch(err => console.log(err))
}
