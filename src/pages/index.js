import React from "react"
import { Link, graphql } from "gatsby"
import styled from '@emotion/styled';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { Section, Constraint, theme, media } from '../styles'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const heroData = data.allContentfulHero.edges[0].node

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Utah Pumpkins | Pumpkin Carving Ideas and Inspiration"
          description="Utah Pumpkins is a place to show off awesome pumpkin carving ideas and get inspiration for your own halloween fun." />
        <Section>
          <Constraint>
            <Columns>
              <Column className="vertical-center">
                <div>
                  <h1>{heroData.title.title}</h1>
                  {documentToReactComponents(JSON.parse(heroData.subtitle.subtitle))}
                  <FlexRow className="margin-top-30 margin-bottom-30">

                    <Link to="/gallery/" >
                      <button>
                        Check out the Gallery&nbsp;›
                      </button>
                    </Link>
                  </FlexRow>
                </div>
              </Column>
              <Column>
                <StyledImg fluid={heroData.heroImage.fluid} backgroundColor={theme.colors.dark} alt="Utah Pumpkins" />
              </Column>
            </Columns>
          </Constraint>
        </Section>
      </Layout>
    )
  }
}

export default Index
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulHero(filter: {page: {eq: "index"}}) {
      edges {
        node {
          heroImage {
            fluid(toFormat: PNG, quality: 90, maxWidth: 700) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          page
          title {
            title
          }
          subtitle {
            subtitle
          }
        }
      }
    }
  }
`

const StyledImg = styled(Img)`

`

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

`

const Column = styled.div`
  width: 55%;
  padding-left: 10px;
  padding-right: 10px;

  &.vertical-center {
    display: flex;
    align-items: center;
  }

  &:nth-of-type(2) {
    width: 45%;
  }

  ${media.medium} {
    width: 100%;
    padding-left: 0;
    padding-right: 0;

    &:nth-of-type(2) {
      width: 100%;
    }
  }
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;

  ${media.small} {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`
