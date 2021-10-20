import { PageProps } from 'gatsby';
import Layout, { PostsList } from '../components';
import { PostContextData } from '../config/gatsby-node';
import React from 'react';

const PageTemplate = ({ pageContext }: PageProps<object, PostContextData>) => (
  <Layout className="Posts-Layout">
    <PostsList keyPrefix="Posts" data={pageContext} />
  </Layout>
);

export default PageTemplate;
