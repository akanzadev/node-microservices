import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
console.log("dsd13");
const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    // Desactive encryption
    signed: false,
    // Solo si tiene una conexion a internet https
    secure: true,
  })
);

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

/* app.all("*", async (req, res, next) => {
  next(new NotFoundError());
}); */
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("Server started on port 3000!");
  });
};

start();
// NODE UPDATE
/* await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
 */
