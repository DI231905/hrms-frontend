import axiosApi from "../api";
import swal from "sweetalert";

export const login = async (Email, Password) => {
  const postData = {
    Email,
    Password,
  };
  return await axiosApi.post(`/user/login`, postData);
};

export function formatError(errorResponse) {
  switch (errorResponse.message) {
    case "EMAIL_EXISTS":
      //return 'Email already exists';
      swal("Oops", "Email already exists", "error");
      break;
    case "EMAIL_NOT_FOUND":
      //return 'Email not found';
      swal("Oops", "Email not found", "error", { button: "Try Again!" });
      break;
    case "INVALID_PASSWORD":
      //return 'Invalid Password';
      swal("Oops", "Invalid Password", "error", { button: "Try Again!" });
      break;
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "";
  }
}

export function saveTokenInLocalStorage(tokenDetails, cb) {
  let tempObj = Object.assign({}, tokenDetails.data);
  tempObj.expire_time = new Date(new Date().getTime() + tempObj.expire_time);
  localStorage.setItem("userDetails", JSON.stringify(tempObj.user));
  localStorage.setItem("auth", JSON.stringify(tempObj));
  localStorage.setItem("token", tempObj.token);
  if (cb) cb("yes");
}
