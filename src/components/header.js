import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components';

const HeaderStyled = styled.header`
  background-color: white;
  padding: 2rem;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #4AC29A;
  &:visited {
    color: #4AC29A;
  }
`;

const Title = styled.h1`
  margin: 0;
`;

const Header = ({ siteTitle }) => (
  <HeaderStyled>
    <Title>
      <LinkStyled to="/">
        {siteTitle}
      </LinkStyled>
    </Title>
  </HeaderStyled>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
