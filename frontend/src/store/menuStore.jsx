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
        return <data value="" className="result"></data>
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default menuStore;
