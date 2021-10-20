import React from 'react';
import Layout from '../components/layout';
import { PostsList } from '../components';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { PostContextData } from '../config/gatsby-node';

const PageTemplate = ({
  data,
  pageContext,
}: PageProps<IndexData, PostContextData>) => (
  <Layout className="Index-Layout">
    <>
      <div>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </div>
      <PostsList keyPrefix="Index" data={pageContext} />
    </>
  </Layout>
);

export const IndexQuery = graphql`
  query IndexQuery {
    mdx(slug: { eq: "description" }) {
      slug
      body
      id
    }
  }
`;

interface IndexData {
  mdx: {
    slug: 'description';
    body: string;
    id: string;
  };
}

export default PageTemplate;
