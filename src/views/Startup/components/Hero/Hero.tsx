/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

import Container from 'components/Container';

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your name'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
});

const Hero = (): JSX.Element => {
  const theme = useTheme();

  const initialValues = {
    name: '',
    email: '',
  };

  const onSubmit = (values) => {
    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box position={'relative'} zIndex={2}>
      <Box
        position={'relative'}
        zIndex={2}
        minHeight={{ xs: 'calc(100vh - 158px)', md: 'calc(100vh - 230px)' }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginTop={-19}
        paddingTop={13}
        sx={{
          '&::after': {
            content: '""',
            backgroundColor: theme.palette.primary.dark,
            backgroundImage: `linear-gradient(315deg, ${theme.palette.primary.dark} 0%, #031024 60%)`,
            opacity: '0.9',
            width: 1,
            height: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 3,
          },
        }}
      >
        <Container position={'relative'} zIndex={4}>
          <Box>
            <Box marginBottom={4}>
              <Typography
                variant={'h3'}
                align={'center'}
                gutterBottom
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: 700,
                }}
              >
                Tailored Software Solutions utilising the Azure Infrastructure 
              </Typography>
              <Typography
                variant={'h6'}
                align={'center'}
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: 700,
                }}
              >
                SharePoint & Teams App development using Power Apps, SharePoint Framework & ReactJS.
              </Typography>
            </Box>  
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;
