import express, { Express } from 'express';
import config from './config';
import cors, { CorsOptions } from 'cors';
import sequelize from './models';
import authRouter from './routers/auth.router';

const app: Express = express();
const corsOptions: CorsOptions = {
  origin: "*"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRouter);

(async function bootstrap () {
  try {
    await sequelize.sync();
    app.listen(config.PORT, () => {
      console.log(`[server]: Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();