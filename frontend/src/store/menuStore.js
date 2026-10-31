import { create } from "zustand";
import AxiosInstan from "../libs/axios";

const menuStore = create((set) => ({
  menuData: [],
  getAllMenu: async () => {
    try {
      const { data } = await AxiosInstan.get("/menu/getAllMenu");

      if (data.success) {
        set(() => ({
          menuData: data.result,
        }));
        // return <data value="" className="result"></data>
      }
    } catch (error) {
      console.log(error);
    }
  },
  addFood: async (formData) => {
    try {
      const { data } = await AxiosInstan.post("/menu/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        set((state) => ({ menuData: [data.data, ...state.menuData] }));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to create food",
      };
    }
  },
  deleteFood: async (foodId) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete ?`);

      if (!confirmed) return;
      const { data } = await AxiosInstan.delete(`/menu/deleteMenu/${foodId}`);
      if (data.success) {
        set((state) => ({
          menuData: state.menuData.filter((item) => item._id != foodId),
        }));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to create food",
      };
    }
  },
}));

export default menuStore;
