import React from 'react';
import { styled } from '@linaria/react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { color } from '../styles/variable';

const Header = ({ siteTitle, menu }) => {
  const HeaderBar = styled.header`
    color: inherit;
    display: flex;
    flex-direction: column;
  `;

  return (
    <HeaderBar>
      <Logo siteTitle={siteTitle} themeColor={color.headerColor} />
      <MenuBar menu={menu} />
    </HeaderBar>
  );
};

const Logo = ({ siteTitle, themeColor }) => {
  const LogoWrap = styled.div`
    display: flex;
    &::after {
      background: repeating-linear-gradient(
        90deg,
        ${(props) => props.color},
        ${(props) => props.color} 2px,
        transparent 0,
        transparent 10px
      );
      display: block;
      content: '';
      width: 100%;
    }
    a {
      background-color: ${(props) => props.color};
      text-decoration: none;
      padding: 5px 10px;
      color: inherit;
    }
  `;

  return (
    <LogoWrap color={themeColor}>
      <Link to="/">{siteTitle}</Link>
    </LogoWrap>
  );
};

const MenuBar = ({ menu }) => {
  const Menu = styled.nav`
    margin: 20px 0;
    display: flex;
    a {
      text-decoration-color: currentColor;
      margin: 0 20px 10px 0;
      flex: 0 0 auto;
      color: inherit;
    }
  `;

  return (
    <Menu>
      {menu.map((item) => (
        <a key={`Menu-${item.title}`} href={item.path}>
          {item.title}
        </a>
      ))}
    </Menu>
  );
};

MenuBar.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    })
  ),
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  color: PropTypes.shape({
    themeColor: PropTypes.string,
    ...PropTypes.objectOf(PropTypes.string),
  }),
  ...MenuBar.propTypes,
};

Logo.propTypes = {
  siteTitle: PropTypes.string,
  themeColor: PropTypes.string,
};

export default Header;
