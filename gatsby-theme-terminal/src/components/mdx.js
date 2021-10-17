import React from 'react';
import { styled } from '@linaria/react';
import { color } from '../styles/variable';

export const Content = styled.main`
  a {
    color: inherit;
  }

  blockquote {
    border-bottom: 1px solid ${color.post.borderColor};
    border-top: 1px solid ${color.post.borderColor};
    margin: 40px 0;
    padding: 25px;
    p {
      position: relative;
      &:first-of-type {
        margin-top: 0;
        &::before {
          content: '>';
          color: ${color.post.titleColor};
          display: block;
          position: absolute;
          left: -25px;
        }
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  ${InlineCode},
  kbd {
    font-family: 'Fira Code', Consolas, 'Courier New', monospace;
    background: ${color.post.code.bgColor};
    color: ${color.post.code.textColor};
    background-image: none;
    font-feature-settings: normal;
    padding: 1px 6px;
    margin: 0 2px;
    font-size: 0.95rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:not(first-child) {
      margin-top: 40px;
    }
    line-height: 1.3;
  }

  h1,
  h2,
  h3 {
    font-size: 1.4rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1.2rem;
  }

  img {
    display: block;
    max-width: 100%;
  }

  mark {
    color: ${color.post.mark.textColor};
    background: ${color.post.mark.bgColor};
  }

  ol,
  ul {
    list-style: none;
    margin-left: 30px;
    padding: 0;
    li {
      position: relative;
    }
    li:not(:empty)::before {
      color: ${color.post.titleColor};
      position: absolute;
    }
  }

  ol li:not(:empty) {
    counter-increment: li;
    &::before {
      content: counter(li);
      right: calc(100% + 10px);
      display: inline-block;
      text-align: right;
    }
  }

  p {
    margin: 16px auto 20px;
  }

  ul li:not(:empty)::before {
    content: '-';
    left: -20px;
  }
`;

const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  margin: 40px 0;
  &,
  td,
  th {
    border: 1px dashed ${color.post.borderColor};
    padding: 10px;
  }
  th {
    color: ${color.post.titleColor};
  }
`;

// Don't modify InlineCode's style here.
// Modify it in Content.
const InlineCode = styled.code``;

const Image = (props) => {
  const Figure = styled.figure`
    display: table;
    max-width: 100%;
    margin: 25px 0;
    figcaption {
      color: ${color.post.img.textColor};
      background: ${color.post.img.bgColor};
      text-align: center;
      font-size: 14px;
      padding: 5px 10px;
      margin-top: 5px;
    }
  `;
  const YaImg = styled.img`
    margin: 25px 0;
  `;

  const { title } = props;

  return title ? (
    <Figure>
      <img loading="lazy" {...props} />
      <figcaption>{title}</figcaption>
    </Figure>
  ) : (
    <YaImg loading="lazy" {...props} />
  );
};

const components = {
  table: Table,
  inlineCode: InlineCode,
  img: Image,
};

export default components;
