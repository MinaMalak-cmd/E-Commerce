import Joi from "joi";
import { Types } from "mongoose";
import { SuccessResponse } from "../../src/utils/handlers.js";

const dataMethods = ["body", "params", "query", "headers", "file", "files"];

const validationObjectId = (value, helper) => {
  return Types.ObjectId.isValid(value) ? true : helper.message("invalid reference id");
};

export const validation = (JoiSchema) => {
  return (req, res, next) => {
    const validationErr = [];
    dataMethods.forEach((key) => {
      if (JoiSchema[key]) {
        const validationResult = JoiSchema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationErr.push(validationResult.error.details);
        }
      }
    });
    if (validationErr.length > 0) {
      return SuccessResponse(
        res,
        { message: "Validation Error", validationErr },
        404
      );
    }
    return next();
  };
};

export const generalFields = {
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "org"] } })
    .required(),
  password: Joi.string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .messages({
      "string.pattern.base": "Password regex fail",
    })
    .required(),
  _id : Joi.string().custom(validationObjectId),
  file : Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().required()
  }),
};
