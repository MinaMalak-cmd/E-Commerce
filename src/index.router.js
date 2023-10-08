import connectDB from "../DB/connection.js";
import bodyParser from 'body-parser';

import authRouter from "./modules/auth/auth.router.js";
import categoryRouter from "./modules/category/category.router.js";
import subCategoryRouter from "./modules/subCategory/subCategory.router.js";
import brandRouter from "./modules/brands/brand.router.js";
import productRouter from "./modules/products/product.router.js";
import { globalErrorHandling } from "./utils/handlers.js";

const initApp = async (express) => {
  const app = express();
  const port = process.env.PORT || 5000;
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());

  await connectDB();
  const base = `/${process.env.PROJECT_FOLDER}`;
  app.use(`${base}/auth`, authRouter);
  app.use(`${base}/category`, categoryRouter);
  app.use(`${base}/sub-category`, subCategoryRouter);
  app.use(`${base}/brand`, brandRouter);
  app.use(`${base}/product`, productRouter);

  app.use("*", (req, res, next) => {
    return res.json({ message: "In-valid Routing" });
  });
  app.use(globalErrorHandling);

  app.listen(port, () => console.log(`App listening on port ${port}!`));
};

export default initApp;