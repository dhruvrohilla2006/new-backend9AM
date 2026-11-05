import { create } from "zustand";
import AxiosInstan from "../libs/axios";

const authStore = create((set) => ({
  userDetails: null,
  authLoading: true,

  getLogin: async (email, password) => {
    try {
      const { data } = await AxiosInstan.post("/auth/login", {
        email,
        password,
      });

      if (data.success) {
        set({ userDetails: data.data });
      }
      return data;
    } catch (error) {
      console.log("Error", error);
      alert("Something Went Wrong");
      return { success: false };
    }
  },

  checkLogin: async () => {
    try {
      const { data } = await AxiosInstan.get("/auth/check");
      set({ userDetails: data.data, authLoading: false });
      return data;
    } catch (error) {
      set({ userDetails: null, authLoading: false });
      console.log(error)
    }
  },
  logout: async () => {
    try {
      const { data} = await AxiosInstan.get("/auth/logout");
      set({ userDetails: null, authLoading: false });
      return data.success;
    } catch (error) {
      set({ userDetails: null, authLoading: false });
      console.log(error)
    }
  },
}));

export default authStore;