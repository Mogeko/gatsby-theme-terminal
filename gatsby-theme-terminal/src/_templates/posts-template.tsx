import { PageProps } from 'gatsby';
import Layout, { PostsList, PostsData } from '../components';
import React from 'react';

const PageTemplate = ({ pageContext }: PageProps<object, PostsData>) => (
  <Layout className="Posts-Layout">
    <PostsList keyPrefix="Posts" data={pageContext} />
  </Layout>
);

export default PageTemplate;
