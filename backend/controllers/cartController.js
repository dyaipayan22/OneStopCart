import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const addToCart = expressAsyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const user = await User.findById(req.user._id).select('cart');
  if (user) {
    const productInCart = user.cart.find(
      (item) => item?.product?.toString() === productId
    );

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();
    res.json(user.cart);
  } else {
    res.status(401);
    throw new Error('User does not exist');
  }
});

export const getItemsFromCart = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'cart',
    populate: {
      path: 'product',
      select: 'name image _id price',
      model: 'Product',
    },
  });
  if (user) {
    const cartItems = user.cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));
    res.json(cartItems);
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

export const removeItemFromCart = expressAsyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id).select('cart');
  if (user) {
    const productIndex = user.cart.findIndex(
      (item) => item?.product?.toString() === productId
    );

    if (productIndex === -1) {
      res.status(404);
      throw new Error('Product not found');
    }

    user.cart.splice(user.cart.indexOf(productIndex), 1);
    await user.save();
    res.json(user.cart);
  } else {
    res.status(401);
    throw new Error('User does not exist');
  }
});

export const clearCart = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.cart = [];
    await user.save();
    res.json('Cart cleared');
  } else {
    res.status(401);
    throw new Error('User does not exist');
  }
});
