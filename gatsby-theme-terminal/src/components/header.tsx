import React from 'react';
import { styled } from '@linaria/react';
import { Link } from 'gatsby';
import { color } from '../styles/variable';

const Header = ({ siteTitle, menu }: HeaderProps) => {
  const HeaderBar = styled.header`
    color: inherit;
    display: flex;
    flex-direction: column;
  `;

  return (
    <HeaderBar>
      <Logo siteTitle={siteTitle} />
      <MenuBar menu={menu} />
    </HeaderBar>
  );
};

const Logo = ({ siteTitle }: LogoProps) => {
  const LogoWrap = styled.div`
    display: flex;
    &::after {
      background: repeating-linear-gradient(
        90deg,
        ${color.headerColor},
        ${color.headerColor} 2px,
        transparent 0,
        transparent 10px
      );
      display: block;
      content: '';
      width: 100%;
    }
    a {
      background-color: ${color.headerColor};
      text-decoration: none;
      padding: 5px 10px;
      color: inherit;
    }
  `;

  return (
    <LogoWrap>
      <Link to="/">{siteTitle}</Link>
    </LogoWrap>
  );
};

const MenuBar = ({ menu }: MenuProps) => {
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
      {menu.map((item: { title: string; path: string }) => (
        <a key={`Menu-${item.title}`} href={item.path}>
          {item.title}
        </a>
      ))}
    </Menu>
  );
};

type HeaderProps = MenuProps & LogoProps;

interface LogoProps {
  siteTitle: string;
}

interface MenuProps {
  menu: {
    title: string;
    path: string;
  }[];
}

export default Header;
