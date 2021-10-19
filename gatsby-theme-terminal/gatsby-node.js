/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

exports.onPreBootstrap = async ({ reporter }) => {
  const contentPath = `${__dirname}/content`;

  fs.stat(contentPath, (err) => {
    if (err) {
      reporter.info(`creating the ${contentPath} directory`);
      fs.mkdir(contentPath, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const getPosts = async () => {
    const result = await graphql(`
      query {
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
    `);

    if (result.errors) {
      reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query');
    }

    return result.data.allMdx.edges;
  };

  await getPosts()
    .then((posts) => posts.filter((post) => post.node.slug !== 'description'))
    .then((posts) => {
      createPage({
        path: `/posts`,
        component: `${__dirname}/src/_templates/posts-template.tsx`,
        context: {
          posts: posts,
        },
      });
      return posts;
    })
    .then((posts) => {
      posts.forEach(({ node }, index) => {
        createPage({
          path: `/${node.slug}`,
          component: `${__dirname}/src/_templates/article-template.tsx`,
          context: {
            id: node.id,
            prev: index === 0 ? null : posts[index - 1].node,
            next: index === posts.length - 1 ? null : posts[index + 1].node,
          },
        });
      });
    });
};
