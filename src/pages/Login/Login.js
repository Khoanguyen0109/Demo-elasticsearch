import { Button, CircularProgress, FormGroup, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import {Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Layout2 from '../../layouts/Layout2';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { END_POINT } from './constant';
import { useAuthDataContext } from '../../Auth/AuthContext';
import { ROUTE } from '../Main/routes';
import { useHistory } from 'react-router';
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root':{
      marginBottom: theme.spacing(2)
    }
  }
}))

function Login() {
  const classes = useStyles()
  const authContext = useAuthDataContext()
  const history = useHistory();
  const [passwordType, setPasswordType] = useState(1)
  const [isBusy, setIsBusy] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Please enter your email address.'),
    password: Yup.string().required('Please enter your password.'),
    remember: Yup.boolean()
  });
  const onSubmit = async (values) =>{
    const res = await axios({
      method: END_POINT.login.method,
      url: END_POINT.login.url,
      data: {
        email: values.email,
        password: values.password
      }
    })
    console.log(`res.data`, res.data)
    authContext.setData({currentUser: res.data.user }, 'user')
    localStorage.setItem('access_token', res.data.token)
    return history.push(ROUTE.DEFAULT)
  };
  return (
    <Layout2>

<Formik
      initialValues={{
        password: '',
        email: ''
      }}
      validationSchema={LoginSchema}
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
         
          </FormGroup>
          <Typography>
            don't have account , register here <span> <Link to="/register">Register</Link>
</span>
          </Typography>
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

export default Login
