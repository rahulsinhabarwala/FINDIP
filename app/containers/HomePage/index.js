/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as ACTONS from './actions'
import * as SELECTORS from './selectors';
import reducer from './reducer';
import saga from './saga';
import { ipv4Validator, ipv6Validator } from '../../../commonUtils'
import Header from '../../components/Header/index'
export class HomePage extends React.Component {
  state = {
    ip: {
      ip: "",
      asn: "",
      netmask: null,
      hostname: null,
      city: "",
      post_code: "",
      country: "",
      country_code: "",
      latitude: 0,
      longitude: 0
    },
    enteredIp: "",
    ipkeys: [],
    isValid: true
  }

  componentDidMount() {
    this.props.getOwnIpAddress()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.getIpSuccess && nextProps.getIpSuccess != this.props.getIpSuccess) {
      let ip = JSON.parse(JSON.stringify(this.state.ip))
      ip = nextProps.getIpSuccess.ip;
      let ipkeys = Object.keys(nextProps.getIpSuccess.ip)
      this.setState({ ipkeys, ip })
    }
    if (nextProps.getIpFailure && nextProps.getIpFailure != this.props.getIpFailure) {
      window.alert(nextProps.getIpFailure)
      this.setState({
        ip: {
          ip: "",
          asn: "",
          netmask: null,
          hostname: null,
          city: "",
          post_code: "",
          country: "",
          country_code: "",
          latitude: 0,
          longitude: 0
        }
      })
    }
  }
  handelIpOnClick = (event) => {
    event.preventDefault()
    if (ipv4Validator(this.state.enteredIp) || ipv6Validator(this.state.enteredIp)) {
      this.setState({ isValid: true }, () => this.props.getOwnIpAddress(this.state.enteredIp))
    } else {
      this.setState({ isValid: false })
    }
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>FINDIP</title>
          <meta name="author" content="Rahul Sinha"></meta>
          <meta name="description" content="Quick tool to whois an IP address" />
        </Helmet>
        <Header />
        <main className="main">
          <form className="search-form" onSubmit={this.handelIpOnClick} >
            <label ></label>
            <input className={this.state.isValid ? "search-field" : "search-field search__error"} name="search-field" placeholder='Enter an IP address' onChange={() => this.setState({ enteredIp: event.target.value })} />
          </form>
          <ul className="data-list list-group">
            {this.state.ipkeys.length && this.state.ipkeys.map((item, index) =>
              <li key={index} className="data__item">
                <article className={`data__name`}>{item}</article>
                <article className={`data__value`}>{this.state.ip[item] || `N/A`}</article>
              </li>
            )}
          </ul>
        </main>
      </React.Fragment>
    )
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  getIpSuccess: SELECTORS.getIpSuccess(),
  getIpFailure: SELECTORS.getIpFailure()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getOwnIpAddress: (ipAddress, ipType) => dispatch(ACTONS.getOwnIpAddress(ipAddress, ipType))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
