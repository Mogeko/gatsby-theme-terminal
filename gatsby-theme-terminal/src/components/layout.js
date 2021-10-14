import React from 'react';
import { styled } from '@linaria/react';
import { useColors } from '../styles/variable';
import CssBaseline from '../styles/base';
import Header from './header';
import { graphql, useStaticQuery } from 'gatsby';

const Layout = ({ children, classname }) => {
  const data = useStaticQuery(graphql`
    query SiteDataQuery {
      site {
        siteMetadata {
          themeColor
          title
          menu {
            path
            title
          }
        }
      }
    }
  `);

  const color = useColors(data.site.siteMetadata?.themeColor);

  return (
    <Wrap className={classname}>
      <CssBaseline />
      <Header
        siteTitle={data.site.siteMetadata?.title}
        menu={data.site.siteMetadata?.menu}
        color={color}
      />
      <Main>{children}</Main>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 784px;
  padding: 40px;
  border-right: 1px solid hsla(0, 0%, 100%, 0.1);
`;

const Main = styled.main``;

export default Layout;
