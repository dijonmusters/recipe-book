import React from "react";
import "./recipeTemplate.css";
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Template({
  data,
}) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const renderIngredient = (ingredient, i) => <li key={i}>{ingredient}</li>;
  const renderIngredients = () => (
    <ul>
      {frontmatter.ingredients.map(renderIngredient)}
    </ul>
  );
  return (
    <Layout>
      <SEO title={frontmatter.title} keywords={[`${frontmatter.title}`, `recipe`, `instructions`]} />
      <div className="recipe-post-container">
        <div className="recipe-post">
          <h1>{frontmatter.title} <small>{frontmatter.time}</small></h1>
        </div>
        <div className="recipe-post-content">
          <div>
            <h2>Ingredients</h2>
            {renderIngredients()}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query RecipeByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        ingredients
        time
      }
    }
  }
`;