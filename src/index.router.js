import connectDB from "../DB/connection.js";

const initApp = async (express) =>{
    const app = express();
    const port = process.env.PORT || 5000;

    app.use(express.json());

    await connectDB();
    
    app.listen(port, () => console.log(`App listening on port ${port}!`))

}

export default initApp;