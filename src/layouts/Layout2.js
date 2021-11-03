import { Grid, Hidden, useMediaQuery } from '@mui/material';
import { withStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react'
import clsx from 'clsx'
import bgPattern from '../assets/bg_pattern.svg';

const styles = (theme) => ({
    root: {
      height: '100vh',
      overflow: 'hidden',
      '& .slogan': {
        textAlign: 'center',
        fontSize: theme.fontSize.small,
        color: theme.mainColors.gray[8],
        margin: theme.spacing(1, 0, 2, 0),
      },
      '& .help-text': {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
        '&.domain': {
          marginTop: theme.spacing(-1),
        },
      },
      '& .login-info, & .organization-title': {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
      },
    },
    left: {
      background: `url(${bgPattern}) 50% 100% no-repeat ${theme.palette.primary.main}`,
      backgroundSize: 'cover',
      height: '100%',
    },
    right: {
      height: '100%',
      position: 'relative',
    },
    layoutXS: {
      padding: theme.spacing(0, 1),
      width: '100%',
    },
    logo: {
      paddingTop: '8vh',
      margin: '0 0 10px 0',
      fontSize: '27px',
      fontWeight: 'bold',
      lineHeight: 0.59,
      letterSpacing: '5.4px',
      textAlign: 'center',
      color: theme.mainColors.tertiary[5],
    },
    slogan: {
      textAlign: 'center',
      color: theme.mainColors.gray[8],
      lineHeight: 0.59,
      margin: theme.spacing(2.5, 0, 3, 0),
    },
    termAndPolicy: {
      textAlign: 'center',
      fontSize: theme.fontSize.small,
      paddingBottom: '10px',
      // position: 'absolute',
      // left: 0,
      right: 0,
      bottom: '10px',
      paddingTop: '8px',
      '& a': {
        color: theme.mainColors.gray[8],
        textDecoration: 'underline',
      },
    },
    rightForm: {
      position: 'relative',
      maxWidth: '450px',
      // height: 'calc(100% - 240px)',
      // maxHeight: 'calc(100% - 240px)',
      margin: 'auto',
      marginBottom: '40px',
      '& .suspended-wrapper p': {
        color: theme.mainColors.gray[8],
      },
      '& .box-fade': {
        opacity: 0,
      },
      '& .link': {
        '& a': {
          color: theme.mainColors.primary1[0],
        },
      },
      '&  form': {
        textAlign: 'left',
        '& > h4': {
          fontSize: theme.fontSize.medium,
          color: theme.palette.primary.main,
          fontWeight: 500,
        },
        '& .btn-group': {
          position: 'relative',
          '& .MuiCircularProgress-root': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
          },
          '& .MuiButton-root': {
            minWidth: '120px',
          },
        },
      },
      '& > .suspended-wrapper': {
        margin: 'auto',
        textAlign: 'center',
      },
    },
    ps: {
      height: 'calc(100% - 48px)',
    },
  });
  
function Layout2(props) {
    const {classes ,children} = props
    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Grid container className={classes.root}>
      <Hidden xsDown>
        <Grid item className={classes.left} md={6} />
      </Hidden>
      <Grid
        item
        className={clsx(classes.right, { [classes.layoutXS]: matches })}
        md={6}
      >
        <Box className={classes.ps}>
          <div>
            <div className={classes.logo}>Logo</div>
            <div className={classes.slogan}>Title</div>
            <div className={classes.rightForm}>{children}</div>
          </div>
        </Box>
      </Grid>
    </Grid>
    )
}

export default withStyles(styles)(Layout2);
