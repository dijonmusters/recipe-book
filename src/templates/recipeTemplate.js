import React from "react";
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import Recipe from "../components/recipe";

export default function Template({
  data,
}) {
  const { markdownRemark } = data;
  const { frontmatter: { ingredients, title }, html: method } = markdownRemark;
  return (
    <Layout>
      <SEO title={title} keywords={[`${title}`, `recipe`, `instructions`]} />
      <Recipe ingredients={ingredients} method={method} />
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