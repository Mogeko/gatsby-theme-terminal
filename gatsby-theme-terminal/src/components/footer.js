import React from 'react';
import { styled } from '@linaria/react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Footer = ({ year, now }) => {
  const Wrap = styled.footer`
    padding: 40px 0;
    opacity: 0.5;
  `;
  const Copyright = styled.div`
    max-width: 100%;
    font-size: 1rem;
    a {
      color: inherit;
    }
  `;

  return (
    <Wrap>
      <Copyright>
        <span>&copy; {now === year ? `${year}` : `${year}-${now}`} </span>
        Powered by <Link to="https://gatsbyjs.com">Gatsby.js</Link> :: Theme
        made by <Link to="https://github.com/Mogeko">Mogeko</Link>
      </Copyright>
    </Wrap>
  );
};

Footer.propTypes = {
  year: PropTypes.number,
  now: PropTypes.number,
};

export default Footer;
