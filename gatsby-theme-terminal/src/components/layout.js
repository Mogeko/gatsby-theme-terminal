import React from 'react';
import { styled } from '@linaria/react';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import CssBaseline from '../styles/base';
import Header from './header';
import Footer from './footer';

const Layout = ({ children, classname }) => {
  const data = useStaticQuery(graphql`
    query SiteDataQuery {
      site {
        siteMetadata {
          themeColor
          title
          year
          menu {
            path
            title
          }
        }
      }
      siteBuildMetadata {
        buildTime
      }
    }
  `);

  const now = new Date(
    Date.parse(data.siteBuildMetadata?.buildTime)
  ).getFullYear();

  return (
    <Wrap className={classname}>
      <CssBaseline />
      <Header
        siteTitle={data.site.siteMetadata?.title}
        menu={data.site.siteMetadata?.menu}
      />
      <Main>{children}</Main>
      <Footer year={data.site.siteMetadata?.year} now={now} />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100vh;
  max-width: 864px;
  padding: 40px;
  border-right: 1px solid hsla(0, 0%, 100%, 0.1);
`;

const Main = styled.main`
  flex-grow: 1;
`;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  classname: PropTypes.string,
};

export default Layout;
