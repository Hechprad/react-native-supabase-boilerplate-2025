import { z } from 'zod';
import i18n from '@/lib/i18n';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (
    issue.code === z.ZodIssueCode.invalid_type &&
    issue.received === 'undefined' &&
    ctx.defaultError === 'Required'
  ) {
    return { message: i18n.t('fields.global.required') };
  }
  return { message: ctx.defaultError };
};

export const setZodCustomErrorMap = () => {
  z.setErrorMap(customErrorMap);
};
