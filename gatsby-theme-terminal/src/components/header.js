import React from 'react';
import { styled } from '@linaria/react';
import { Link } from 'gatsby';

const Header = ({ siteTitle, menu, color }) => {
  const HeaderBar = styled.header`
    color: inherit;
    display: flex;
    flex-direction: column;
  `;

  return (
    <HeaderBar>
      <Logo siteTitle={siteTitle} themeColor={color.themeColor} />
      <MenuBar menu={menu} />
    </HeaderBar>
  );
};

const Logo = ({ siteTitle, themeColor }) => {
  const Wrap = styled.div`
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
    <Wrap color={themeColor}>
      <Link to="/">{siteTitle}</Link>
    </Wrap>
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
        <a href={item.path}>{item.title}</a>
      ))}
    </Menu>
  );
};

export default Header;
