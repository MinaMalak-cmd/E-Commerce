import cloudinary from "./cloudinaryConfigurations.js";

export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(async (error) => {
            if(req.method !== "GET" && req.imgPath){
              await cloudinary.uploader.destroy(req.imgPath);
            }
            return next(new Error(error))
        })
    }
}

export const globalErrorHandling = (error, req, res, next) => {
    error.statusCode = error.statusCode || 400;
    if(process.env.NODE_ENV !== 'production'){
        sendErrorDev(error, res);
    }
    else{
        sendErrorProd(error, res);  
    }
}

const sendErrorDev = (error, res) =>
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
    stack: error.stack,
  });

const sendErrorProd = (error, res) =>
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
  });

export const SuccessResponse = (res, data, statusCode) => {
    return res.status(statusCode).json(data)
}