import { Request } from 'express';
import { validationResult } from 'express-validator';

export default class BaseController {
  getValidationErrors(req: Request): { [key: string]: string } | undefined {
    const errors = validationResult(req)
      .array()
      .reduce((acc: { [key: string]: [string] }, err: any) => {
        acc[err.param] = err.msg;
        return acc;
      }, {});

    return Object.keys(errors).length > 1 ? errors : undefined;
  }
}
