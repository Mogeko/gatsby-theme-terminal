import { GatsbyNode } from 'gatsby';
import path from 'path';
import fs from 'fs';

export const onPreBootstrap: GatsbyNode['onPreBootstrap'] = async ({
  reporter,
}) => {
  const contentPath = path.resolve(`${__dirname}/../../content`);

  fs.stat(contentPath, (err) => {
    if (err) {
      reporter.info(`creating the ${contentPath} directory`);
      fs.mkdir(contentPath, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
  });
};

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;
  const getPosts = async () => {
    const result: QueryData = await graphql(`
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

    return result.data?.allMdx.edges;
  };

  await getPosts()
    .then((posts) => excludeSpecialFiles(posts))
    .then((posts) => {
      createPage({
        path: `/`,
        component: path.resolve(
          `${__dirname}/../_templates/index-template.tsx`
        ),
        context: {
          posts: posts,
        },
      });
      return posts;
    })
    .then((posts) => {
      createPage({
        path: `/posts`,
        component: path.resolve(
          `${__dirname}/../_templates/posts-template.tsx`
        ),
        context: {
          posts: posts,
        },
      });
      return posts;
    })
    .then((posts) => {
      posts?.forEach(({ node }, index) => {
        createPage({
          path: `/${node.slug}`,
          component: path.resolve(
            `${__dirname}/../_templates/article-template.tsx`
          ),
          context: {
            id: node.id,
            prev: index === 0 ? null : posts[index - 1].node,
            next: index === posts.length - 1 ? null : posts[index + 1].node,
          },
        });
      });
    });
};

const excludeSpecialFiles = (posts?: { node: NodeData }[], files = []) => {
  const specialFiles = ['about', 'description'].concat(files);
  return posts?.filter((post) => !specialFiles.includes(post.node.slug));
};

interface QueryData {
  errors?: never;
  data?: {
    allMdx: {
      edges: {
        node: NodeData;
      }[];
    };
  };
}

export interface PostContextData {
  posts?: {
    node: NodeData;
  }[];
}

export interface NodeData {
  id: string;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
  };
  slug: string;
}
