import makeServer from './app';

const start = async () => {
  await makeServer('0.0.0.0', 8080);
};

start();
