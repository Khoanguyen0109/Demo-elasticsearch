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

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root':{
      marginBottom: theme.spacing(2)
    }
  }
}))

function Login() {
  const classes = useStyles()
  const [passwordType, setPasswordType] = useState(1)
  const [isBusy, setIsBusy] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('Please enter your email address.'),
    password: Yup.string().required('Please enter your password.'),
    remember: Yup.boolean()
  });
  const onSubmit = () =>{

  };
  return (
    <Layout2>

<Formik
      initialValues={{
        identity: '',
        password: '',
        remember: true
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
                        onClick={() => { this.setState({ passwordType: !passwordType }); }}
                      >
                        {passwordType ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                )
              }}
             
              label={<span>Password</span>}
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

export default Login
