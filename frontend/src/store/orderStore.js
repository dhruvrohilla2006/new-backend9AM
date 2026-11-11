import { create } from "zustand";
import AxiosInstan from "../libs/axios";

const orderStore = create((set) => ({
  orderData: null,
  getOrdersAdmin: async () => {
    try {
      const { data } = await AxiosInstan.get("order/getOrderAdmin");
      console.log(data);
      set({ orderData: data.data });
      return data;
    } catch (error) {
      console.log("found Error", error);
    }
  },
}));

export default orderStore;
