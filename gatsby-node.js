const path = require('path');
const { writeToS3 } = require('./src/utils/s3');

const isProd = process.env.NODE_ENV === 'production';

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const recipePostTemplate = path.resolve(`src/templates/recipeTemplate.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              time
              ingredients
              method
            }
          }
        }
      }
    }
  `).then(async (result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    if (isProd) {
      const recipes = result.data.allMarkdownRemark.edges.map(
        ({
          node: {
            frontmatter: { title, time, ingredients, method },
          },
        }) => ({ title, time, ingredients, method })
      );

      await writeToS3(recipes);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: recipePostTemplate,
        context: {}, // additional data can be passed via context
      });
    });
  });
};
