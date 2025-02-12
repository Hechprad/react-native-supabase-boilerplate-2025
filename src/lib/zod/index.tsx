import { z } from 'zod';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (
    issue.code === z.ZodIssueCode.invalid_type &&
    issue.received === 'undefined' &&
    ctx.defaultError === 'Required'
  ) {
    return { message: 'Campo obrigatório' };
  }
  return { message: ctx.defaultError };
};

export const setZodCustomErrorMap = () => {
  z.setErrorMap(customErrorMap);
};
