import * as yup from 'yup';

export const noteValidationSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    category: yup.string().required(),
    content: yup.string().required(),
    created: yup.string().required(),
    archived: yup.boolean().required(),
    dates: yup.string(),
  })
  .noUnknown();
