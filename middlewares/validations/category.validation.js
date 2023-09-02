import Joi from 'joi';
import { generalFields } from './validation.js';

export const addCategory  = {
    body : 
        Joi.object({
            name : Joi.string().min(2).max(100).required(),
            createdBy : Joi.string().hex().length(24)
        }).required(),
    // file : Joi.string()
    // file: Joi.object({
    //     filename: Joi.string().required(),
    //     mimetype: Joi.string().valid('image/jpeg', 'image/png', 'application/pdf').required(),
    //     size: Joi.number().max(5242880).required() // Maximum file size in bytes (5MB)
    //   }).required()
}

export const updateCategory = {
    params : Joi.object({
        id : generalFields._id
    }).options({presence : "required"}),
    body: Joi.object({
        name : Joi.string().min(2).max(100),
        createdBy : Joi.string().hex().length(24)
    }).required(),
    file: Joi.object({
        image : Joi.object()
    }).required(),
}
