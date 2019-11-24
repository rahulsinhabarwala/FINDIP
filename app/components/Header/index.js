/**
 *
 * Header
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Header() {
  return  (<header className="header">
            <h1 className="header__logo">FINDIP</h1>
            <p className="header__discription">a quick tool to whois an IP address</p>
          </header>)
}

Header.propTypes = {};

export default Header;
