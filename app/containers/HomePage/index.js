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
    enteredIp:"",
    ipkeys: undefined, 
    ipv4RE: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    // ipv6RE:"((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))"
  }

  componentDidMount(){
      // this.props.getOwnIpAddress()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.getOwnIpSuccess && nextProps.getOwnIpSuccess != this.props.getOwnIpSuccess){
      let ip = JSON.parse(JSON.stringify(this.state.ip))
      ip = nextProps.getOwnIpSuccess.ip ;
      let ipkeys = Object.keys(nextProps.getOwnIpSuccess.ip)
      this.setState({ipkeys,ip})
    }
  }
  handelIpOnClick = (event) => {
    event.preventDefault()
      if (this.state.ipv4RE.test(this.state.enteredIp)){
        console.log("trueee")
      }
      // elseif(){
      //   console.log("nottrue")
      
      // }
  }
  render() {
    console.log(JSON.stringify(this.state.enteredIp))
    return (
      <React.Fragment>
        <Helmet>
          <title>FINDIP</title>
          <meta name="author" content="Rahul Sinha"></meta>
          <meta name="description" content="Quick tool to whois an IP address"/>
        </Helmet>

      <main className="main">
        <form className="search-form">
            <input className="search-field" onChange={() => this.setState({enteredIp:event.target.value})}/>
            <button className="btn btn-primary" type="button" onClick={this.handelIpOnClick}></button>
        </form>
          <ul className="data-container list-group">
          { this.state.ipkeys && this.state.ipkeys.map( (item,index) => 
              <li key={index} className="data__field">
                <article className={`data__name data__name__${item}`}>{item}</article>
                <article className={`data__value data__value__${item}`}>{this.state.ip[item]}</article>
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
  getOwnIpSuccess: SELECTORS.getOwnIpSuccess(),
  getOwnIpFailure: SELECTORS.getOwnIpFailure()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getOwnIpAddress: (ip) => dispatch(ACTONS.getOwnIpAddress(ip))
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
