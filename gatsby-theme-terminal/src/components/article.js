import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@linaria/react';
import { Content } from './mdx';

const Article = ({ title, author, date, children }) => {
  return (
    <article>
      <Header title={title} author={author} date={date} />
      <Content>{children}</Content>
    </article>
  );
};

const Header = ({ title, author, date }) => {
  const StyledHeader = styled.header`
    --border-color: ${(props) => props.color};
  `;
  const StyledH1 = styled.h1`
    margin: 40px 0 15px;
    padding-bottom: 15px;
    font-size: 1.4rem;
    line-height: 1.3;
    position: relative;
    color: ${(props) => props.color};
    border-bottom: 3px dotted var(--border-color);
    &::after {
      content: '';
      width: 100%;
      display: block;
      position: absolute;
      bottom: 2px;
      border-bottom: 3px dotted var(--border-color);
    }
  `;
  const StyledPostMate = styled(PostMate)`
    color: ${(props) => props.color};
    font-size: 1rem;
    margin-bottom: 10px;
    a {
      color: inherit;
    }
  `;

  return (
    <StyledHeader color="#922d00">
      <StyledH1 color="#ffa460">{title}</StyledH1>
      <StyledPostMate color="#ffa464b3" author={author} date={date} />
    </StyledHeader>
  );
};

const PostMate = ({ className, style, author, date }) => (
  <div className={className} style={style}>
    <span>{date}</span> :: <a href="/about">{author}</a>
  </div>
);

Article.propTypes = {
  children: PropTypes.element.isRequired,
  ...Header.propTypes,
};

Header.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
};

PostMate.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  color: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
};

export default Article;
