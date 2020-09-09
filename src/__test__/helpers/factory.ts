import { Response, Request } from 'express';

export const mockResponse = (opts: Partial<Response> = {}): Response => {
  const res: Partial<Response> = {
    ...opts,
  };

  res.status = res.status || jest.fn().mockReturnValue(res);
  res.json = res.json || jest.fn().mockReturnValue(res);

  return (res as unknown) as Response;
};

export const mockRequest = (opts: Partial<Request> = {}): Request => {
  const request = {
    ...opts,
  };

  return (request as unknown) as Request;
};
