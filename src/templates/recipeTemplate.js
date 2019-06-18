import React from "react";
import { graphql } from 'gatsby';
import SEO from "../components/seo"
import Recipe from "../components/recipe";

export default function Template({
  data,
}) {
  const { markdownRemark } = data;
  const { frontmatter: { ingredients, title, method } } = markdownRemark;
  return (
    <>
      <SEO title={title} keywords={[`${title}`, `recipe`, `instructions`]} />
      <Recipe ingredients={ingredients} method={method} name={title} />
    </>
  );
}

export const pageQuery = graphql`
  query RecipeByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        ingredients
        time
        method
      }
    }
  }
`;