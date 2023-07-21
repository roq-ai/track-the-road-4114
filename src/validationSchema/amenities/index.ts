import * as yup from 'yup';

export const amenityValidationSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  location_id: yup.string().nullable(),
});
