import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Input = styled.input`
  font-size: 2rem;
  line-height: 2;
  padding: 0 2rem;
  width: 100%;
  margin: 0.125rem 0;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Card = styled.div`
  position: relative;
  background-color: white;
  padding: 2rem 2rem;
  @media only screen and (max-width: 768px) {
    margin: 0.125rem;
  }
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const LinkStyled = styled(Link)`
  &:visited, :link {
    color: #444;
    text-decoration: none;
  }
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-gap: 0.25rem;
  grid-template-columns: 1fr 1fr 1fr;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Label = styled.span`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  font-size: 0.75rem;
  background-color: #4AC29A;
  padding: 0 0.5rem;
  color: white;
`

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
      <LinkStyled to={path} key={i}>
        <Card>
          {title}
          <Label>{time}</Label>
        </Card>
      </LinkStyled>
    )
  };

  render() {
    const { recipes } = this.state;
    return (
      <Layout>
        <SEO title="Recipes" keywords={[`recipe`, `list`, `all`]} />
        <Container>
          <Input
            placeholder="recipe name or ingredient"
            onChange={this.handleInput}
            autofocus="true"
          />
          {
            recipes.length > 0
              ? (
                <RecipeGrid>
                  {recipes.map(this.renderRecipes)}
                </RecipeGrid>
              ) : <Card>No recipes found</Card>
          }
        </Container>
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
