import React from 'react';
import Layout from '../components/layout';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import components from '../components/mdx';
import { graphql, Link } from 'gatsby';
import Article, { NodeProps } from '../components/article';

const shortcodes = { Link };

const PageTemplate = ({ data: { mdx, site }, pageContext }: PageTempProps) => {
  const { prev, next } = pageContext;
  const prevPage = prev
    ? {
        id: prev.id,
        title: prev.frontmatter.title,
        slug: `/posts/${prev.slug}`,
      }
    : null;
  const nextPage = next
    ? {
        id: next.id,
        title: next.frontmatter.title,
        slug: `/posts/${next.slug}`,
      }
    : null;

  const meta = {
    title: mdx.frontmatter?.title,
    date: mdx.frontmatter?.date,
    author: site.siteMetadata?.author,
  };

  return (
    <Layout className="Post-Layout">
      <Article key={mdx.id} meta={meta} prev={prevPage} next={nextPage}>
        <MDXProvider components={{ ...components, ...shortcodes }}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </Article>
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
        date(formatString: "YYYY-MM-DD")
      }
      internal {
        content
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`;

interface PageTempProps {
  data: PageQueryData;
  pageContext: {
    prev: pageContextNodeProps;
    next: pageContextNodeProps;
  };
}

interface PageQueryData {
  mdx: {
    id: string;
    body: string;
    frontmatter: {
      title: string;
      date: string;
    };
  };
  site: {
    siteMetadata: {
      author: string;
    };
  };
}

type pageContextNodeProps = {
  frontmatter: {
    title: string;
  };
} & NodeProps;

export default PageTemplate;
