import productModel from "../../../../DB/models/product.model.js";
import cartModel from "../../../../DB/models/cart.model.js";
import { SuccessResponse, asyncHandler } from "../../../utils/handlers.js";

export const addToCart = asyncHandler(async (req, res, next) => {
  let userId = req.user._id;
  let { products } = req.body;
  let subTotal = 0;
  for (let i = 0; i < products.length; i++) {
    const productCheck = await productModel
      .findOne({
        _id: products[i].productId,
        stock: { $gte: products[i].quantity },
      })
      .select("priceAfterDiscount title");
    if (!productCheck)
      return next(
        new Error(
          "Either product isn't existing or doesn't have enough quantity",
          { cause: 400 }
        )
      );
    else {
      subTotal += productCheck.priceAfterDiscount * products[i].quantity;
      continue;
    }
  }
  //=================== Validate if cart exists =======================

  //   const cart = await cartModel.find({ userId });
  //   if (!cart) {
  const newCart = await cartModel.create({
    userId,
    products,
    subTotal,
  });
  return SuccessResponse(
    res,
    { message: "Cart created successfully", statusCode: 230, newCart },
    201
  );
  //   }
  //=================== if cart exists =======================
});

export const getAllCarts = asyncHandler(async (req, res, next) => {
  const carts = await cartModel
    .find()
    .populate([{ path: 'userId', select: 'userName -_id' }]);
    
  return carts
    ? SuccessResponse(
        res,
        {
          message: "carts retrieved successfully",
          statusCode: 200,
          carts,
        },
        200
      )
    : next(new Error("Can't get All carts", { cause: 400 }));
});
