import Debug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";

const debug = Debug("app:database");

const connectDB = (connectionString: string) =>
  new Promise<void>((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret._v;
      },
    });
    mongoose
      .connect(connectionString)
      .then(() => {
        debug(chalk.green("DB conected"));
        resolve();
      })
      .catch((error) => {
        debug(chalk.red("Not posible to initialize the DB"));
        debug(error.message);
        reject();
        return;
      });
    mongoose.connection.on("close", () => {
      debug(chalk.yellow("Desconectado de la base de datos"));
    });
  });

export default connectDB;
