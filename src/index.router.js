import connectDB from "../DB/connection.js";
import bodyParser from 'body-parser';

import categoryRouter from "./modules/category/category.router.js";
import { globalErrorHandling } from "./utils/handlers.js";

const initApp = async (express) => {
  const app = express();
  const port = process.env.PORT || 5000;
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());

  await connectDB();
  const base = '/e-commerce';
  app.use(`${base}/category`, categoryRouter);

  app.use("*", (req, res, next) => {
    return res.json({ message: "In-valid Routing" });
  });
  app.use(globalErrorHandling);

  app.listen(port, () => console.log(`App listening on port ${port}!`));
};

export default initApp;