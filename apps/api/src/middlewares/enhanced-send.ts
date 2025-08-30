import { RequestHandler } from "express";
import { Pagination } from "../schemas/pagination.js";

declare global {
  namespace Express {
    export interface Response {
      enhancedSend: (
        statusCode: number,
        data: unknown,
        pagination?: Pagination,
      ) => Response;
    }
  }
}

export const addEnhancedSendMethod: RequestHandler = (req, res, next) => {
  res.enhancedSend = (statusCode, data, pagination) => {
    const success = statusCode < 400;
    return res.status(statusCode).json({
      success,
      statusCode,
      timestamp: new Date(),
      data,
      pagination,
    });
  };
  next();
};
