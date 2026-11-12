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
  updateOrderStatus: async (OrderId, NewStatus) => {
    try {
      const { data } = await AxiosInstan.put(
        `/order/${OrderId}?status=${NewStatus}`,
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default orderStore;
