import makeServer from './app';

const start = async () => {
  await makeServer('localhost', 3000);
};

start();
