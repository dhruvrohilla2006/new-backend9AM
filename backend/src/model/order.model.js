import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
  totalprice: {
    type: Number,
    required: true,
  },
  cartItem: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "menu",
        required:true,
      },
      quantity:{
        type:Number,
        required:true
      }
    },
  ],
  userId:{
    type:mongoose.Schema.types.ObjectId,
    required:true,
    ref:'user'
  },
  status:{
    type:String,
    enums:{
        values: [
          'pending',
          'accepted',
          'preparing',
          'out-for-delivery',
          'delivered',
          'cancelled',
          'rejected',
        ],
        message: '{VALUE} is not a valid order status',
      },
      default:'pending'
  }
});
