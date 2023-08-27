import { asyncHandler } from '../../../utils/handlers.js';

export const addCategory = asyncHandler(async (req, res, next) =>{
    const { name, image, createdBy} = req.body;
    name = "ddd";
    console.log(req.body);
    return res.json({ name, image, createdBy})
});