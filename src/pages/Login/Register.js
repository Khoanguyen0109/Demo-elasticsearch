import { Button, CircularProgress, FormGroup, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Layout2 from '../../layouts/Layout2';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { END_POINT } from './constant';
import { useHistory } from 'react-router';
import { ROUTE_AUTH } from './routes';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root':{
      marginBottom: theme.spacing(2)
    }
  }
}))

function Register() {
  const classes = useStyles()
  const history = useHistory()
  const {enqueueSnackbar} = useSnackbar();
  const [passwordType, setPasswordType] = useState(1)
  const [isBusy, setIsBusy] = useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name.'),
    lastName: Yup.string().required('Please enter your last name.'),
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Please enter your email address.'),
    password: Yup.string().required('Please enter your password.'),
    confirmPassword: Yup.string()
    .required('Please enter your password.')
    .oneOf([Yup.ref('password'), null], 'Confirmed password does not match the password above.'),
    remember: Yup.boolean()
  });
  const onSubmit = async (values) =>{
    try {
      const res = await axios({
        method: END_POINT.register.method,
        url: END_POINT.register.url,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password
        }
      })
      enqueueSnackbar("Successfully " , {
        variant: 'success',
      })
      history.push(ROUTE_AUTH.LOGIN)
    } catch (error) {
      
    }

  };
  return (
    <Layout2>

<Formik
      initialValues={{
        password: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        // console.log(values);
        onSubmit(values);
      }}
      validateOnChange={true}
      validateOnBlur={false}
    >
      {({ errors, touched, values }) => {
        return <Form className={classes.root}>
          <FormGroup >
          
            <Field name='firstName'
              required
              as={TextField}
              type='text'
              placeholder='First Name'
              error={errors.firstName && touched.firstName}
              helperText={errors.firstName && touched.firstName ? <div>{errors.firstName}</div> : false}
              label={<span>First Name</span>}
            />
               <Field name='lastName'
              required
              as={TextField}
              type='text'
              placeholder='Last name'
              error={errors.lastName && touched.lastName}
              helperText={errors.lastName && touched.lastName ? <div>{errors.lastName}</div> : false}
              label={<span>Last name</span>}
            />
              <Field name='email'
              required
              as={TextField}
              type='email'
              placeholder='Email'
              error={errors.email && touched.email}
              helperText={errors.email && touched.email ? <div>{errors.email}</div> : false}
              label={<span>Email</span>}
            />
            <Field name='password'
              required
              as={TextField}
              placeholder='Password'
              type={passwordType ? 'password' : 'text'}
              error={errors.password && touched.password}
              helperText={errors.password && touched.password ? <div>{errors.password}</div> : false}
              InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setPasswordType(!passwordType)}
                      >
                        {passwordType ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                )
              }}
             
              label={<span>Password</span>}
            />
          <Field name='confirmPassword'
                as={TextField}
                inputType='password'
                placeholder={'Confirm Password'}
                error={
                  errors.confirmPassword && touched.confirmPassword
                }
                type={passwordType ? 'password' : 'text'}
                label={<span>{'Confirm Password'}</span>}
                required
                helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() => setPasswordType(!passwordType)}
                            >
                            {passwordType ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                    )
                  }}
              />
          </FormGroup>
          <Box style={{ textAlign: 'center' }} className='btn-group' mt={1}>
            <Button color='primary' variant='contained' type='submit' disabled={isBusy}>Sign in</Button>
            {isBusy &&
              <CircularProgress size={24} />
            }
          </Box>
          {/* <Box mt={2} display='flex' justifyContent='center'>
            <Typography component='a' variant='subtitle1' color='primary' align='center' href={ROUTE_AUTH.FORGOT_PASSWORD}>{t('forgot_password')}</Typography>
          </Box> */}
        </Form>;
      }}
    </Formik>
    </Layout2>

  );
}

export default Register
