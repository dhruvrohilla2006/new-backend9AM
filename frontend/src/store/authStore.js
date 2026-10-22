import { create } from "zustand";
import AxiosInstan from "../libs/axios";

const authStore = create(() => ({
  getLogin: async (email, password) => {
    try {
      const {data} = await AxiosInstan.post("/auth/login", {
        email,
        password,
      });

      return data;
    } catch (error) {
      (console.log("Error", error), alert("Something Went Wrong"));
    }
  },
  checkLogin: async () => {
    try {
      const { data } = await AxiosInstan.get("/auth/check");

      console.log(data);
    } catch (error) {
      console.log("Error", error);
      // alert('Something Went Wrong')
    }
  },
}));

export default authStore;
