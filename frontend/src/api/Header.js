import { store } from "../redux/store";
import axios from "axios";

class Headers {
  static setHeaders = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = store.getState().user.user.accessToken;
  };
}

export default Headers;
