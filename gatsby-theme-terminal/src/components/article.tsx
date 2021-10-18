import React from 'react';
import { styled } from '@linaria/react';
import { Content } from './mdx';
import { Link } from 'gatsby';
import { color } from '../styles/variable';

const Article = ({ key, meta, prev, next, children }: ArticleProps) => {
  const { title, author, date } = meta;
  const ArticleWrap = styled.article`
    padding: 20px 0px;
    margin: 20px auto;
  `;
  return (
    <ArticleWrap key={key}>
      <Header title={title} author={author} date={date} />
      <Content>{children}</Content>
      <Footer prev={prev} next={next} />
    </ArticleWrap>
  );
};

const Header = ({ title, author, date }: HeaderProps) => {
  const HeaderWrap = styled.header`
    --border-color: ${color.post.borderColor};
  `;
  const H1Wrap = styled.h1`
    margin: 40px 0 15px;
    padding-bottom: 15px;
    font-size: 1.4rem;
    line-height: 1.3;
    position: relative;
    color: ${color.post.titleColor};
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

  return (
    <HeaderWrap color={color.post.borderColor}>
      <H1Wrap>{title}</H1Wrap>
      <PostMate author={author} date={date} />
    </HeaderWrap>
  );
};

const PostMate = ({ author, date }: PostMetaProps) => {
  const PostMateWrap = styled.div`
    color: ${color.post.metaColor};
    font-size: 1rem;
    margin-bottom: 10px;
    a {
      color: inherit;
    }
  `;
  return (
    <PostMateWrap>
      <span>{date}</span> :: <a href="/about">{author}</a>
    </PostMateWrap>
  );
};

const Footer = ({ prev, next }: FooterProps) => {
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
          <WrapLink key={prev.id}>
            <Link to={prev.slug}>&larr; {prev.title}</Link>
          </WrapLink>
        ) : null}
        {next ? (
          <WrapLink key={next.id}>
            <Link to={next.slug}>{next.title} &rarr;</Link>
          </WrapLink>
        ) : null}
      </FooterBottoms>
    </FooterWrap>
  );
};

interface ArticleProps extends FooterProps {
  key: string;
  children: React.ReactChild;
  meta: HeaderProps;
}

interface HeaderProps extends PostMetaProps {
  title: string;
}

interface PostMetaProps {
  author: string;
  date: string;
}

interface FooterProps {
  prev: NodeProps;
  next: NodeProps;
}

export type NodeProps = {
  id: string;
  title: string;
  slug: string;
} | null;

export default Article;
