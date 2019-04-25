import React, { useState, createContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const RecipeContext = createContext({});

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    },
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
            ingredients
            time
          }
        }
      }
    }
  }
`

const RecipeProvider = props => {
  const data = useStaticQuery(query);
  const allRecipes = data.allMarkdownRemark.edges.map(recipe => recipe.node.frontmatter);
  const [recipes] = useState(allRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const resetFilteredRecipes = () => setFilteredRecipes(recipes);
  return (
    <RecipeContext.Provider value={{ recipes, filteredRecipes, setFilteredRecipes, selectedRecipe, setSelectedRecipe, resetFilteredRecipes }}>
      {props.children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;
export { RecipeContext };