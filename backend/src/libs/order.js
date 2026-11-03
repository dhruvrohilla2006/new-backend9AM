const createOrderObject = (data, reqObj) => {
  return data.map((item) => {
    const cartItem = reqObj.find(
      (cart) => cart._id.toString() === item.item_id,
    );

    if (!cartItem) {
      throw new Error(`Cart item not found: ${item.item_id}`);
    }

    return {
      itemId: item.item_id,
      name: cartItem.name,
      price: cartItem.price,
      quantity: item.quantity,
      subtotal: cartItem.price * item.quantity,
    };
  });
};

export default createOrderObject;
