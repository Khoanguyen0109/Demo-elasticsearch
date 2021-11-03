import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid  } from '@mui/material';
import { ROUTE_AUTH } from '../Login/routes';
import { withStyles } from '@mui/styles';

// import './ErrorPage.scss';
const styles = (theme) => ({
  root: {
    textAlign: 'center',
    height: '100vh',
    '& .number': {
      color: theme.mainColors.tertiary[4],
      fontSize: '5vw',
      fontWeight: 600
    },
    '& .short-description': {
      fontSize: '1.5vw',
      fontWeight: 600,
      marginTop: '-1.5vw'
    },
    '& .detail-description': {
      marginTop: '1vh',
      fontSize: '1vw'
    },
    '& .go-back': {
      fontSize: '1vw',
      marginTop: '2vw',
      color: theme.palette.secondary.main
    }
  },
  GridItem: {
    textAlign: 'center'
  }
});
class ErrorPage extends PureComponent {
  render() {
    const {
      errorCode,
      shortDescription,
      detailDescription,
      isNotFoundPage
    } = this.props;
    const { classes} = this.props;
    return (
      <Grid container className={classes.root} alignContent='center'>
        <Grid item lg={12} md={12} sm={12} xs={12} className='error-page forbidden' alignContent='center' justify='center'>
          <div className='number'>{errorCode}</div>
          {/* <div className='short-description'>{t(shortDescription)}</div>
          <div className='detail-description'>{t(detailDescription)}</div> */}
          {isNotFoundPage ? (
            <div className='go-back'>
              <Link to={ROUTE_AUTH.LOGIN}>Return to Home Page</Link>
            </div>
          ) : (
              ''
            )}
        </Grid>
      </Grid>
    );
  }
}

ErrorPage.propTypes = {
  t: PropTypes.func,
  errorCode: PropTypes.string,
  shortDescription: PropTypes.string,
  detailDescription: PropTypes.string,
  classes: PropTypes.object,
  isNotFoundPage: PropTypes.bool
};

ErrorPage.defaultProps = {
  errorCode: '404',
  shortDescription: 'page_not_found',
  detailDescription: 'not_found_description',
  isNotFoundPage: true
};

export default withStyles(styles)((ErrorPage));
