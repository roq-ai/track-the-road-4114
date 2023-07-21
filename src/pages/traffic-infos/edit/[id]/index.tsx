import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getTrafficInfoById, updateTrafficInfoById } from 'apiSdk/traffic-infos';
import { trafficInfoValidationSchema } from 'validationSchema/traffic-infos';
import { TrafficInfoInterface } from 'interfaces/traffic-info';
import { LocationInterface } from 'interfaces/location';
import { getLocations } from 'apiSdk/locations';

function TrafficInfoEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TrafficInfoInterface>(
    () => (id ? `/traffic-infos/${id}` : null),
    () => getTrafficInfoById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TrafficInfoInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTrafficInfoById(id, values);
      mutate(updated);
      resetForm();
      router.push('/traffic-infos');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TrafficInfoInterface>({
    initialValues: data,
    validationSchema: trafficInfoValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Traffic Infos',
              link: '/traffic-infos',
            },
            {
              label: 'Update Traffic Info',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Traffic Info
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.traffic_status}
            label={'Traffic Status'}
            props={{
              name: 'traffic_status',
              placeholder: 'Traffic Status',
              value: formik.values?.traffic_status,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.alternative_route}
            label={'Alternative Route'}
            props={{
              name: 'alternative_route',
              placeholder: 'Alternative Route',
              value: formik.values?.alternative_route,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="expected_clear_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Expected Clear Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.expected_clear_time ? new Date(formik.values?.expected_clear_time) : null}
              onChange={(value: Date) => formik.setFieldValue('expected_clear_time', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.cause}
            label={'Cause'}
            props={{
              name: 'cause',
              placeholder: 'Cause',
              value: formik.values?.cause,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<LocationInterface>
            formik={formik}
            name={'location_id'}
            label={'Select Location'}
            placeholder={'Select Location'}
            fetcher={getLocations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/traffic-infos')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'traffic_info',
    operation: AccessOperationEnum.UPDATE,
  }),
)(TrafficInfoEditPage);
