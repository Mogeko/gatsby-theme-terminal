import React from 'react';
import { styled } from '@linaria/react';

export const Content = styled.div``;

const Table = styled.table``;

const InlineCode = styled.code``;

const ImageInner = ({ className, style, children, ...props }) => (
  <img className={className} style={style} {...props} loading="lazy">
    {children}
  </img>
);

const Image = styled(ImageInner)``;

const components = {
  table: Table,
  inlineCode: InlineCode,
  img: Image,
};

export default components;
