import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import Header from "./Header";
export default class UserApi {

  static async getDishList(params) {
    const url = `${BASE_URL}/food/list-items`;
    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      // Handle error appropriately
      console.error("Error fetching dish list", error);
      throw error;
    }
  }

  static async getDishDetails(params) {
    const url = `${BASE_URL}/food/details`;
    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      // Handle error appropriately
      console.error("Error fetching dish details", error);
      throw error;
    }
  }

  static async getIngredientList() {
    const url = `${BASE_URL}/food/get-ingredients`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // Handle error appropriately
      console.error("Error fetching ingredient list", error);
      throw error;
    }
  }

  //   static async sendPhoneOTP(params) {
  //     return axios
  //       .post(`${BASE_URL}/send-phone-otp`, params)
  //       .then((response) => response.data);
  //   }

  //   static async verifyRegisterOTP(params) {
  //     return axios
  //       .post(`${BASE_URL}/verify-phone-otp`, params)
  //       .then((response) => response.data);
  //   }

  //   static async createPassword(params) {
  //     return axios
  //       .post(`${BASE_URL}/create-password`, params)
  //       .then((response) => response.data);
  //   }

  //   static async login(params) {
  //     return axios
  //       .post(`${BASE_URL}/login`, params)
  //       .then((response) => response.data);
  //   }

  //   static async getProfile() {
  //     Header.setHeaders();
  //     return axios
  //       .get(`${BASE_URL}/get-profile`)
  //       .then((response) => response.data);
  //   }

  //   static async editUserProfile(params) {
  //     Header.setHeaders();
  //     return axios
  //       .put(`${BASE_URL}/edit-user-profile`, params)
  //       .then((response) => response.data);
  //   }

  //   static async editBusinessProfile(params) {
  //     Header.setHeaders();
  //     return axios
  //       .put(`${BASE_URL}/edit-business-profile`, params)
  //       .then((response) => response.data);
  //   }

  //   static async editBankDetails(params) {
  //     Header.setHeaders();
  //     return axios
  //       .put(`${BASE_URL}/edit-bank-details`, params)
  //       .then((response) => response.data);
  //   }
}