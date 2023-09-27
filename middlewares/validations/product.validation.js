import Joi from "joi";
import { generalFields } from "./validation.js";

export const addProduct = {
  body: Joi.object({
    title: Joi.string().min(2).max(100).required(),
    desc: Joi.string().min(4).max(255),
    price: Joi.number().positive().required(),
    appliedDiscount: Joi.number().positive().min(1).max(100),
    stock: Joi.number().positive().required(),
    colors: Joi.array().items(Joi.string().required()),
    sizes: Joi.array().items(Joi.string().required()),
  }).required(),
  query: Joi.object({
    // createdBy: generalFields._id,
    categoryId: generalFields._id,
    subCategoryId: generalFields._id,
    brandId: generalFields._id,
  }).options({ presence: "required" }),
  file: generalFields.file.required(),
};

export const updateProduct = {
  params: Joi.object({
    id: generalFields._id,
  }).options({ presence: "required" }),
  body: Joi.object({
    title: Joi.string().min(2).max(100),
    desc: Joi.string().min(4).max(255),
    price: Joi.number().positive(),
    appliedDiscount: Joi.number().positive().min(1).max(100),
    stock: Joi.number().positive(),
    colors: Joi.array().items(Joi.string().required()),
    sizes: Joi.array().items(Joi.string().required()),
  }).required(),
  query: Joi.object({
    // createdBy: generalFields._id,
    categoryId: generalFields._id,
    subCategoryId: generalFields._id,
    brandId: generalFields._id,
  }).options({ presence: "optional" }),
  file: generalFields.file,
};

export const deleteProduct = {
  params: Joi.object({
    id: generalFields._id,
  }).options({ presence: "required" }),
  body: Joi.object({
    deletedBy: generalFields._id,
  }).options({ presence: "optional" }),
};
