import { RequestHandler } from 'express';

const notFound: RequestHandler = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);

  next(error);
};

export default notFound;
