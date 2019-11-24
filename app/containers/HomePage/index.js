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

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
// 10.15.3 node 
// 6.4.1 npm
  state = {
    ip:{
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
    ipkeys:undefined 
  }

  componentDidMount(){
    if(!this.state.ipkeys){
      this.props.getOwnIpAddress()
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.getOwnIpSuccess && nextProps.getOwnIpSuccess != this.props.getOwnIpSuccess){
      console.log("nextProps.getOwnIpSuccess",nextProps.getOwnIpSuccess)
      let ip = JSON.parse(JSON.stringify(this.state.ip))
      ip = nextProps.getOwnIpSuccess ;
      let ipkeys = Object.keys(nextProps.getOwnIpSuccess.ip)
      this.setState({ipkeys,ip})
    }
  }
  render() {
    // console.log(JSON.stringify(this.state))
    return (
      <React.Fragment>
        <Helmet>
          <title>FINDIP</title>
          <meta name="author" content="Rahul Sinha"></meta>
          <meta name="description" content="Quick tool to whois an IP address"/>
        </Helmet>

      <main className="main">
        <form className="search-form" action="#">
              <label htmlFor="search-field"></label>
              <input className="search-field" type="number" name="search-field"/>
        </form>
          <ul className="data-container">
            {this.state.ipkeys && this.state.ipkeys.length > 0 && this.state.ipkeys.map((item,index) => {
              <li className="data__field">
                {console.log("stateeeeeee",item)}
                <article className={`data__name data__name__${item}`}>{item}</article>
                {/* <article className={`data__value data__value__${item}`}>{this.state.ip[item]}</article> */}
            </li>
            })}
              {/* <li className="data__field">
                  <article className="data__name data__name__asn">{this.state.asn}</article>
                  <article className="data__value data__value__asn"></article>
              </li>
              <li className="data__field">
                  <article className="data__name data__name__netmask">{this.state.netmask}</article>
                  <article className="data__value data__value__netmask"></article>
              </li>
              <li className="data__field">
                  <article className="data__name data__name__hostname">{this.state.hostname}</article>
                  <article className="data__value data__value__hostname"></article>
              </li>
              <li className="data__field">
                  <article className="data__name data__name__city">{this.state.city}</article>
                  <article className="data__value data__value__city"></article>
              </li>
              <li className="data__field">
                  <article className="data__name data__name__post-code">{this.state.post_code}</article>
                  <article className="data__value data__value__post-code"></article>
              </li>
              <li className="data__field">
                  <article className="data__name data__name__country">{this.state.country}}</article>
                  <article className="data__value data__value__country"></article>
              </li>
              <li className="data__field">
                  <article className="data__name data__name__country-code">{this.state.country_code}</article>
                  <article className="data__value data__value__country-code"></article>
              </li>
              <li className="data__field">
                  <article className="data__name data__name__latitude">{this.state.latitude}</article>
                  <article className="data__value data__value__latitude"></article>
              </li>
              <li className="data__field">
                  <article className="data__name data__name__longitude">{this.state.longitude}</article>
                  <article className="data__value data__value__longitude"></article>
              </li> */}
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
  getOwnIpSuccess: SELECTORS.getOwnIpSuccess(),
  getOwnIpFailure: SELECTORS.getOwnIpFailure()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getOwnIpAddress: () => dispatch(ACTONS.getOwnIpAddress())
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
