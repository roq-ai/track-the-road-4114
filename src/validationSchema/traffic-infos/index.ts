import * as yup from 'yup';

export const trafficInfoValidationSchema = yup.object().shape({
  traffic_status: yup.string().required(),
  alternative_route: yup.string(),
  expected_clear_time: yup.date(),
  cause: yup.string(),
  location_id: yup.string().nullable(),
});
