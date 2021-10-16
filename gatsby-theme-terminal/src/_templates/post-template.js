import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import components from '../components/mdx';
import { graphql, Link } from 'gatsby';

const shortcodes = { Link };

// { data: { mdx, site }, pageContext }
const PageTemplate = ({ data: { mdx } }) => {
  // const { prev, next } = pageContext;
  // const prevPage = prev
  //   ? {
  //       title: prev.frontmatter.title,
  //       slug: `/posts/${prev.slug}`,
  //     }
  //   : null;
  // const nextPage = next
  //   ? {
  //       title: next.frontmatter.title,
  //       slug: `/posts/${next.slug}`,
  //     }
  //   : null;

  return (
    <Layout>
      <MDXProvider components={{ ...components, ...shortcodes }}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      internal {
        content
      }
    }
  }
`;

PageTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.any.isRequired,
  }),
};

export default PageTemplate;
