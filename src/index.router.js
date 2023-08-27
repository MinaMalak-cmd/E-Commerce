import connectDB from "../DB/connection.js";
import categoryRouter from "./modules/category/category.router.js";
import { globalErrorHandling } from "./utils/handlers.js";

const initApp = async (express) => {
  const app = express();
  const port = process.env.PORT || 5000;

  app.use(express.json());

  await connectDB();

  app.use("/e-commerce/category", categoryRouter);

  app.use("*", (req, res, next) => {
    return res.json({ message: "In-valid Routing" });
  });
  app.use(globalErrorHandling);

  app.listen(port, () => console.log(`App listening on port ${port}!`));
};

export default initApp;
