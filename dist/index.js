import dotenv from "dotenv";
dotenv.config();
import { initilizeServer } from "./server/index";
import connectDB from "./database/index";
const port = process.env.PORT ?? process.env.SERVER_PORT ?? 6001;
(async () => {
    try {
        await connectDB(process.env.MONGODB_STRING);
        initilizeServer(+port);
    }
    catch (error) {
        process.exit(1);
    }
})();
