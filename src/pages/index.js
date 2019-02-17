import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPage extends Component {
  state = {
    recipes: this.props.data.allMarkdownRemark.edges
  }

  handleInput = (e) => {
    const { value } = e.currentTarget;
    const allRecipes = this.props.data.allMarkdownRemark.edges;
    const recipes = allRecipes.filter(recipe => {
      const { title, ingredients } = recipe.node.frontmatter;
      const ingredientExists = ingredients.some(ingredient => ingredient.toLowerCase().includes(value.toLowerCase()));
      return ingredientExists || title.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({ recipes });
  }

  renderRecipes = (recipe, i) => {
    const { title, path, time } = recipe.node.frontmatter;
    return (
      <Link to={path}>
        <div key={i}>
          <div>
            {title}
            <br />
            <small>{time}</small>
          </div>
        </div>
      </Link>
    )
  };

  render() {
    const { recipes } = this.state;
    return (
      <Layout>
        <SEO title="Recipes" keywords={[`recipe`, `list`, `all`]} />
        <div className="wrapper">
          <input
            placeholder="recipe name or ingredient"
            onChange={this.handleInput}
          />
          {
            recipes.length > 0
              ? (
                <div className="recipe-grid">
                  {recipes.map(this.renderRecipes)}
                </div>
              ) : <p>No recipes found</p>
          }
        </div>
      </Layout>
    )
  }
}

export default IndexPage;

export const pageQuery = graphql`
  query AllRecipes {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
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
`;
