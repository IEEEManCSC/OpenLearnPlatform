import type { RequestHandler } from 'express';
import type { z } from 'zod';

export const validate =
    <
        P extends z.ZodSchema,
        R extends z.ZodSchema,
        B extends z.ZodSchema,
        Q extends z.ZodSchema,
    >(schema: {
        params?: P;
        response?: R;
        body?: B;
        query?: Q;
    }): RequestHandler<z.output<P>, z.output<R>, z.output<B>, z.output<Q>> =>
        (req, _res, next) => {
            if (schema.params) {
                Object.defineProperty(req, 'params', {
                    value: schema.params.parse(req.params),
                });
            }

            if (schema.query) {
                Object.defineProperty(req, 'query', {
                    value: schema.query.parse(req.query),
                });
            }

            if (schema.body) {
                Object.defineProperty(req, 'body', {
                    value: schema.body.parse(req.body),
                });
            }

            next();
        };
