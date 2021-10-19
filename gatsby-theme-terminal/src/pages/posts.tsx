import { graphql, Link, useStaticQuery } from 'gatsby';
import { styled } from '@linaria/react';
import React from 'react';
import { Header } from '../components/article';
import Layout from '../components';

const PostsQuery = graphql`
  query PostsQuery {
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

const Posts = () => (
  <Layout className="Posts-Layout">
    <PostsList keyPrefix="Posts" />
  </Layout>
);

export const PostsList = ({ keyPrefix }: { keyPrefix: string }) => {
  const {
    allMdx: { edges },
  }: PostsData = useStaticQuery(PostsQuery);
  const PostItem = styled.article`
    text-align: left;
    margin: 20px auto;
    padding: 20px 0;
    &:not(:last-of-type) {
      border-bottom: 1px solid #3034361a;
    }
  `;
  const ReadMore = ({ url }: { url: string }) => {
    const ReadMoreWrap = styled.div`
      a {
        color: inherit;
        display: inline-flex;
        background: none;
        padding: 0;
        margin: 20px 0;
        max-width: 100%;
        border-color: transparent;
        outline-color: currentcolor;
        text-decoration: none;
      }
    `;
    return (
      <ReadMoreWrap>
        <Link to={url}>Read More &rarr;</Link>
      </ReadMoreWrap>
    );
  };

  return (
    <div>
      {edges.map(({ node }) => (
        <PostItem key={`${keyPrefix}-${node.id}`}>
          <Header title={node.frontmatter.title} date={node.frontmatter.date} />
          <p>{node.excerpt}</p>
          <ReadMore url={node.slug} />
        </PostItem>
      ))}
    </div>
  );
};

interface PostsData {
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
}

export default Posts;
