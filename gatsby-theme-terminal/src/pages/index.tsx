import React from 'react';
import Layout from '../components/layout';
import { PostsList } from '../components';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { NodeData } from '../config/gatsby-node';

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
  const data = excludeSpecialFiles(query.allMdx.edges);
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

export const excludeSpecialFiles = (
  posts?: { node: NodeData }[],
  files = []
) => {
  const specialFiles = ['about', 'description'].concat(files);
  return posts?.filter((post) => !specialFiles.includes(post.node.slug));
};

interface IndexData {
  allMdx: {
    edges: {
      node: NodeData;
    }[];
  };
  mdx: {
    slug: 'description';
    body: string;
    id: string;
  };
}

export default IndexPage;
