import productModel from "../../../../DB/models/product.model.js";
import orderModel from "../../../../DB/models/order.model.js";
import { SuccessResponse, asyncHandler } from "../../../utils/handlers.js";
import userModel from "../../../../DB/models/user.model.js";

// export const addOrder = asyncHandler(async (req, res, next) => {
//   let {
//     orderCode,
//     orderAmount,
//     orderStatus,
//     fromDate,
//     toDate,
//     orderAssignedToUsers,
//     isFixedAmount,
//     isPercentage,
//   } = req.body;

//   //  *********************** order code check
//   const order = await orderModel.findOne({ orderCode });
//   if (order) {
//     return next(new Error("Duplicate order code", { cause: 400 }));
//   }
//   if (isPercentage == isFixedAmount) {
//     return next(new Error("Please select one of them", { cause: 400 }));
//   }

//   if (isPercentage && (orderAmount < 1 || orderAmount > 100)) {
//     return next(new Error("Invalid OrderAmount", { cause: 400 }));
//   }
//   let userArr = [];
//   for (const user of orderAssignedToUsers) {
//     userArr.push(user.userId);
//   }
//   const dbCheck = await userModel.find({ _id: { $in: userArr } });
//   if (dbCheck.length !== userArr.length) {
//     return next(new Error("Invalid userIds", { cause: 400 }));
//   }

//   const orderObject = {
//     orderCode,
//     orderAmount,
//     orderStatus,
//     fromDate,
//     toDate,
//     orderAssignedToUsers,
//     isFixedAmount,
//     isPercentage,
//   };

//   const orderdb = await orderModel.create(orderObject);

//   return SuccessResponse(
//     res,
//     { message: "Order created successfully", statusCode: 230, orderdb },
//     201
//   );
// });

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await orderModel.find();

  return orders
    ? SuccessResponse(
        res,
        {
          message: "orders retrieved successfully",
          statusCode: 200,
          orders,
        },
        200
      )
    : next(new Error("Can't get All orders", { cause: 400 }));
});

// export const deleteOrder = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const order = await orderModel.findOneAndDelete({ _id: id });
//   if (!order) {
//     return next(new Error("Order is not found", { cause: 400 }));
//   }
//   return SuccessResponse(
//     res,
//     { message: "Order deleted successfully", statusCode: 200, order },
//     200
//   );
// });
