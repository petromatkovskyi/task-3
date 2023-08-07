import * as yup from 'yup';

export const patchNoteValidationSchema = yup
  .object()
  .shape({
    name: yup.string(),
    category: yup.string(),
    content: yup.string(),
    archived: yup.boolean(),
    dates: yup.string(),
  })
  .noUnknown();
