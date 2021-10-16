import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@linaria/react';
import { Content } from './mdx';
import { Link } from 'gatsby';
import { color } from '../styles/variable';

const Article = ({ id, meta, prevPage, nextPage, children }) => {
  const { title, author, date } = meta;
  const ArticleWrap = styled.article`
    padding: 20px 0px;
    margin: 20px auto;
  `;
  return (
    <ArticleWrap id={id}>
      <Header title={title} author={author} date={date} />
      <Content>{children}</Content>
      <Footer prev={prevPage} next={nextPage} />
    </ArticleWrap>
  );
};

const Header = ({ title, author, date }) => {
  const HeaderWrap = styled.header`
    --border-color: ${(props) => props.color};
  `;
  const H1Wrap = styled.h1`
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
  const PostMateWrap = styled(PostMate)`
    color: ${(props) => props.color};
    font-size: 1rem;
    margin-bottom: 10px;
    a {
      color: inherit;
    }
  `;

  return (
    <HeaderWrap color={color.post.headerDividerColor}>
      <H1Wrap color={color.post.titleColor}>{title}</H1Wrap>
      <PostMateWrap color={color.post.metaColor} author={author} date={date} />
    </HeaderWrap>
  );
};

const PostMate = ({ className, style, author, date }) => (
  <div className={className} style={style}>
    <span>{date}</span> :: <a href="/about">{author}</a>
  </div>
);

const Footer = ({ prev, next }) => {
  const FooterWrap = styled.footer`
    margin-top: 50px;
  `;
  const FooterTitle = styled.div`
    display: flex;
    text-align: center;
    margin: 100px 0 20px;
    span {
      text-align: center;
      margin: 0 auto;
      padding: 5px 10px;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  `;
  const FooterBottoms = styled.div`
    display: flex;
    color: inherit;
    align-items: center;
    justify-content: center;
  `;
  const WrapLink = styled.span`
    position: relative;
    display: inline-flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    border-radius: 8px;
    padding: 0;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    overflow: hidden;
    a {
      text-decoration: none;
      color: inherit;
      padding: 16px 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  `;

  return (
    <FooterWrap>
      <FooterTitle>
        <span>Read other posts</span>
      </FooterTitle>
      <FooterBottoms>
        {prev ? (
          <WrapLink id={prev.id}>
            <Link to={prev.slug}>&larr; {prev.title}</Link>
          </WrapLink>
        ) : null}
        {next ? (
          <WrapLink id={next.id}>
            <Link to={next.slug}>{next.title} &rarr;</Link>
          </WrapLink>
        ) : null}
      </FooterBottoms>
    </FooterWrap>
  );
};

Article.propTypes = {
  children: PropTypes.element.isRequired,
  meta: PropTypes.shape(Header.propTypes),
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
