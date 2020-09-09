import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import errorHandler from './middlewares/error-handler';
import notFound from './middlewares/not-found';

const makeServer = async (host: string, port: number) => {
  const app = express();

  // middlewares
  app.use(express.json());
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('common'));
  }
  app.use(helmet());
  app.use(cors());

  // routes
  app.get('/', (req, res) => res.send('✨ Server is alive ✨'));

  // utils middlewares
  app.use(notFound);
  app.use(errorHandler);

  const server = app.listen(port, host, () => {
    if (process.env.NODE_ENV !== 'test') {
      // eslint-disable-next-line no-console
      console.log(`>>> SERVER RUNNING ON http://${host}:${port} <<<`);
    }
  });

  return server;
};

export default makeServer;
