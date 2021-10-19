import React from 'react';
import Layout from '../components/layout';
import { PostsList } from '../components';
import { graphql, useStaticQuery } from 'gatsby';

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
  }
`;

const IndexPage = () => {
  const data = useStaticQuery(IndexQuery).allMdx.edges;
  return (
    <Layout className="Index-Layout">
      <PostsList keyPrefix="Index" data={{ posts: data }} />
    </Layout>
  );
};

export default IndexPage;
