import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
console.log('dsd13');
const app = express();

app.set('trust proxy', true);
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
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };