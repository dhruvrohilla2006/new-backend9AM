import { toast } from "react-hot-toast";
import { create } from "zustand";
import AxiosInstan from "../libs/axios";

const cartStore = create((set, get) => ({
  cart: [],
  cartCount: 0,

  AddItemToCart: (food) => {
    console.log("Food Item", food);
    set((state) => {
      let existingItem = state.cart.find((item) => item._id === food._id);
      if (existingItem) {
        console.log(state);
        // toast.success("Item Added to Cart Successfully")
        return {
          cartCount: state.cartCount + 1,
          cart: state.cart.map((item) => {
            return item._id === food._id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          }),
        };
      }
      console.log(state);
      toast.success("Item Added to Cart Successfully");
      return {
        cartCount: state.cartCount + 1,
        cart: [
          ...state.cart,
          {
            _id: food._id,
            name: food.name,
            price: food.price,
            image: food.images[0],
            quantity: 1,
          },
        ],
      };
    });
  },
  increaseQuantity: (id) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),

      cartCount: state.cartCount + 1,
    }));
  },

  decreaseQuantity: (id) => {
    set((state) => {
      const item = state.cart.find((item) => item._id === id);

      if (!item) return state;

      // Don't allow quantity below 1
      if (item.quantity === 1) {
        return { cart: state.cart.filter((item) => item._id != id) };
      }

      return {
        cart: state.cart.map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        ),

        cartCount: state.cartCount - 1,
      };
    });
  },
  ResetCart: async () => {
    set({ cart: [] });
  },
  createOrder: async () => {
    const orderData = get().cart.map((item) => {
      return { item_id: item._id, quantity: item.quantity };
    });

    const { data } = await AxiosInstan.post("/order", {
      cartItem: orderData,
    });
    console.log(data);
    console.log(orderData);
  },
}));

export default cartStore;
