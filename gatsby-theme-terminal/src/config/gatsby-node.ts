import { GatsbyNode } from 'gatsby';
import path from 'path';
import fs from 'fs';

const CREATE_PATHS = ['/', '/posts'];
const CREATE_TEMPLATES = ['index-template.tsx', 'posts-template.tsx'];

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
                hidden
                noEmit
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
    .then((pages) => pages?.filter((page) => !page.node.frontmatter.noEmit))
    .then((pages) => {
      CREATE_PATHS.forEach((_path, i) =>
        createPage({
          path: _path,
          component: path.resolve(
            `${__dirname}/../_templates/${CREATE_TEMPLATES[i]}`
          ),
          context: {
            posts: pages,
          },
        })
      );
      return pages;
    })
    .then((pages) => {
      pages?.forEach(({ node }, index) => {
        createPage({
          path: `/${node.slug}`,
          component: path.resolve(
            `${__dirname}/../_templates/article-template.tsx`
          ),
          context: {
            id: node.id,
            prev: index === 0 ? null : pages[index - 1].node,
            next: index === pages.length - 1 ? null : pages[index + 1].node,
          },
        });
      });
    });
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
    hidden: boolean;
    noEmit: boolean;
  };
  slug: string;
}
