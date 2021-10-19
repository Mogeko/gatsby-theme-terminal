import React from 'react';
import Layout from '../components/layout';
import { PostsList } from '../components';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const IndexQuery = graphql`
  query IndexQuery {
    allMdx(sort: { fields: slug }) {
      edges {
        node {
          id
          excerpt(pruneLength: 300)
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
          }
          slug
        }
      }
    }
    mdx(slug: { eq: "description" }) {
      slug
      body
      id
    }
  }
`;

const IndexPage = () => {
  const query: IndexData = useStaticQuery(IndexQuery);
  const data = query.allMdx.edges.filter(
    (post) => post.node.slug !== 'description'
  );
  const description = query.mdx.body;
  return (
    <Layout className="Index-Layout">
      <>
        <div>
          <MDXRenderer>{description}</MDXRenderer>
        </div>
        <PostsList keyPrefix="Index" data={{ posts: data }} />
      </>
    </Layout>
  );
};

interface IndexData {
  allMdx: {
    edges: {
      node: {
        id: string;
        excerpt: string;
        frontmatter: {
          title: string;
          date: string;
        };
        slug: string;
      };
    }[];
  };
  mdx: {
    slug: 'description';
    body: string;
    id: string;
  };
}

export default IndexPage;
