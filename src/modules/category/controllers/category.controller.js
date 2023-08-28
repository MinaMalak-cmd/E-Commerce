import { asyncHandler } from '../../../utils/handlers.js';

// corner cases : check if name sent, check if it's duplicated, check from file (if sent), check from createdBy if sent 
// then create request try create slug using hooks
 
export const addCategory = asyncHandler(async (req, res, next) =>{
    const { name, createdBy} = req.body;
    // check if name sent 
    // name = "ddd";
    console.log(req.body);
    return res.json({ name, createdBy})
});