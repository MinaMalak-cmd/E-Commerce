import productModel from "../../../../DB/models/product.model.js";
import orderModel from "../../../../DB/models/order.model.js";
import { SuccessResponse, asyncHandler } from "../../../utils/handlers.js";
import { generateRandomString } from "../../../utils/stringMethods.js";
import createInvoice from "../../../utils/pdfkit.js";
import sendEmail from "../../../services/emailService.js";

export const addOrder = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { products, address, phoneNumbers, paymentMethod } = req.body;
  const coupon = req?.coupon;
  let sentProducts = [];
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
      let finalPrice = products[i].quantity * productCheck.priceAfterDiscount;
      sentProducts.push({
        productId: productCheck._id,
        quantity: products[i].quantity,
        title: productCheck.title,
        price: productCheck.priceAfterDiscount,
        finalPrice,
      });
      subTotal += finalPrice;
      continue;
    }
  }
  if (coupon?.isFixedAmount && subTotal < coupon?.couponAmount) {
    return next(new Error("Invalid coupon amount", { cause: 400 }));
  }
  let paidAmount;
  if (coupon?.isFixedAmount) {
    paidAmount = subTotal - coupon?.isFixedAmount;
  } else if (coupon?.isPercentage) {
    paidAmount = subTotal * (1 - (req.coupon.couponAmount || 0) / 100);
  } else {
    paidAmount = subTotal;
  }
  let orderStatus = paymentMethod == "cash" ? "placed" : "pending";

  const orderObject = {
    userId,
    products: sentProducts,
    subTotal,
    couponId: coupon?._id || null,
    paidAmount,
    address,
    phoneNumbers,
    paymentMethod,
    orderStatus,
  };
  const orderDb = await orderModel.create(orderObject);
  if (!orderDb) {
    return next(new Error("Order fail"));
  }
  //======================= invoice ==================
  const orderCode = `${req.user.userName}__${generateRandomString(3)}`;
  const invoiceData = {
    orderCode,
    date: orderDb.createdAt,
    shipping: {
      name: req.user.userName,
      address,
      city: "Giza",
      state: "Giza",
      country: "Egypt",
    },
    items: orderDb.products,
    subTotal: orderDb.subTotal,
    paidAmount: orderDb.paidAmount,
  };
  await createInvoice(invoiceData, `${orderCode}.pdf`);
  await sendEmail({
    to: req.user.email,
    subject: "Order",
    text: `<h1> Please find your invoice below </h1>`,
    attachments: [
      {
        path: `./Files/${orderCode}.pdf`,
      },
    ],
  });

  for (let i = 0; i < sentProducts.length; i++) {
    const productCheck = await productModel
      .findOne({
        _id: sentProducts[i].productId,
      })
      .select("priceAfterDiscount title stock");
    if (productCheck){
      productCheck.stock -= sentProducts[i].quantity
    }
    await productCheck.save();
  }
  if (req.coupon) {
    for (const user of req.coupon.couponAssignedToUsers) {
        if (user.userId.toString() == userId.toString()) {
            user.usageCount += 1
        }
    }
    await req.coupon.save()
  }
  return SuccessResponse(
    res,
    { message: "Order created successfully", statusCode: 230, orderDb },
    201
  );
});

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await orderModel.find();

  return orders
    ? SuccessResponse(
        res,
        {
          message: "Orders retrieved successfully",
          statusCode: 200,
          orders,
        },
        200
      )
    : next(new Error("Can't get All orders", { cause: 400 }));
});

export const formCartToOrder = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { cartId, address, phoneNumbers, paymentMethod } = req.body;
  const cart = await cartModel.findOne({ _id: cartId, userId });
  if (!cart || !cart.products.length) {
    return next(new Error("Invalid cart", { cause: 400 }));
  }
  const coupon = req?.coupon;
  for (let product of cart.products) {
    const productCheck = await productModel
      .findById(product._id)
      .select("priceAfterDiscount title");
    if (!productCheck) {
      return next(
        new Error(
          "Either product isn't existing or doesn't have enough quantity",
          { cause: 400 }
        )
      );
    } else {
      let finalPrice = product.quantity * productCheck.priceAfterDiscount;
      sentProducts.push({
        productId: productCheck._id,
        quantity: product.quantity,
        title: productCheck.title,
        price: productCheck.priceAfterDiscount,
        finalPrice,
      });
      continue;
    }
  }
  let subTotal = cart.subTotal;
  if (coupon?.isFixedAmount && subTotal < coupon?.couponAmount) {
    return next(new Error("Invalid coupon amount", { cause: 400 }));
  }
  let paidAmount;
  if (coupon?.isFixedAmount) {
    paidAmount = subTotal - coupon?.isFixedAmount;
  } else if (coupon?.isPercentage) {
    paidAmount = subTotal * (1 - (req.coupon.couponAmount || 0) / 100);
  } else {
    paidAmount = subTotal;
  }
  let orderStatus = paymentMethod == "cash" ? "placed" : "pending";
  const orderObject = {
    userId,
    products: sentProducts,
    subTotal,
    couponId: coupon?._id || null,
    paidAmount,
    address,
    phoneNumbers,
    paymentMethod,
    orderStatus,
  };
  const orderDb = await orderModel.create(orderObject);
  if (!orderDb) {
    return next(new Error("Order fail"));
  }
  if (coupon) {
    for (const user of coupon.couponAssginedToUsers) {
      if (user.userId.toString() == userId.toString()) {
        user.usageCount += 1;
      }
    }
    await coupon.save();
  }
  cart.products = [];
  cart.subTotal = 0;
  await cart.save();
  return SuccessResponse(
    res,
    { message: "Order created successfully", statusCode: 230, orderDb },
    201
  );
});
