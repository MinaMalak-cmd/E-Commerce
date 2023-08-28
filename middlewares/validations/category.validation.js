import Joi from 'joi';

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
