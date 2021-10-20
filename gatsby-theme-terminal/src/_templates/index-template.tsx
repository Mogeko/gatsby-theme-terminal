import React, { ReactNode } from 'react';
import Layout from '../components/layout';
import { componemts, PostsList } from '../components';
import { graphql, PageProps } from 'gatsby';
import { styled } from '@linaria/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { PostContextData } from '../config/gatsby-node';
import { MDXProvider } from '@mdx-js/react';

const PageTemplate = ({
  data,
  pageContext,
}: PageProps<IndexData, PostContextData>) => (
  <Layout className="Index-Layout">
    <>
      <IndexContent>{data.mdx.body}</IndexContent>
      <PostsList keyPrefix="Index" data={pageContext} />
    </>
  </Layout>
);

const IndexContent = ({ children }: { children: string & ReactNode }) => {
  const Content = styled.div`
    border: 1px solid #933d00;
    margin-top: 20px;
    padding: 20px;
    :first-child {
      margin-top: 0;
    }
    h1,
    h2,
    h3 {
      font-size: 1.4rem;
    }
  `;
  return (
    <Content>
      <MDXProvider components={componemts}>
        <MDXRenderer>{children}</MDXRenderer>
      </MDXProvider>
    </Content>
  );
};

export const IndexQuery = graphql`
  query IndexQuery {
    mdx(slug: { eq: "index-content" }) {
      slug
      body
    }
  }
`;

interface IndexData {
  mdx: {
    slug: 'index-content';
    body: string;
    id: string;
  };
}

export default PageTemplate;
