import { NextFunction } from 'express';
import notFound from '../../middlewares/not-found';
import { mockRequest, mockResponse } from '../helpers/factory';

describe('notFound', () => {
  it('should return error message and stack in development mode.', () => {
    let error: Error = new Error();
    const next = ((e: Error) => {
      error = e;
    }) as NextFunction;
    const notFoundUrl = 'url';
    const req = mockRequest({
      originalUrl: notFoundUrl,
    });
    const res = mockResponse();

    notFound(req, res, next);

    expect(error.message).toContain('Not found');
    expect(error.message).toContain(notFoundUrl);
  });
});
