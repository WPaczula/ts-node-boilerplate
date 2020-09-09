import { mockRequest, mockResponse } from '../helpers/factory';
import errorHandler from '../../middlewares/error-handler';

describe('errorHandler', () => {
  let initialEnvironmentVariable: string | undefined;

  beforeEach(() => {
    initialEnvironmentVariable = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = initialEnvironmentVariable;
  });

  it('should return error message and stack in development mode.', () => {
    const message = 'message';
    const stack = 'stack';
    const error = new Error(message);
    error.stack = stack;
    const statusCode = 404;
    const res = mockResponse({ statusCode });
    process.env.NODE_ENV = 'development';

    errorHandler(error, mockRequest(), res, jest.fn());

    expect(res.json).toHaveBeenCalledWith({
      message,
      stack,
    });
    expect(res.status).toHaveBeenCalledWith(statusCode);
  });

  it('should return error message without stack in production mode.', () => {
    const message = 'message';
    const error = new Error(message);
    const statusCode = 404;
    const res = mockResponse({ statusCode });
    process.env.NODE_ENV = 'production';

    errorHandler(error, mockRequest(), res, jest.fn());

    expect(res.json).toHaveBeenCalledWith({
      message,
      stack: undefined,
    });
    expect(res.status).toHaveBeenCalledWith(statusCode);
  });

  it('should change status code to 500 if unexpected error occurred.', () => {
    const error = new Error('Unexpected error');
    const res = mockResponse({ statusCode: 200 });

    errorHandler(error, mockRequest(), res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
