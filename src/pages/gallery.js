import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ImageCollection } from "../components/imageCollection"
import { Section, Constraint, theme, media } from "../styles"
// import { GalleryLinks } from "../components/galleryLinks"
import { BreadCrumbs } from "../components/breadCrumbs"

const GalleryPage = props => {
  const { data } = props
  const images = data.allContentfulPumpkinImage.edges
  const siteTitle = data.site.siteMetadata.title
  const heroData = data.allContentfulHero.edges[0].node

  return (
    <Layout location={props.location} title={siteTitle}>
      <BreadCrumbs data={['Home -- /', 'Gallery']} />
      <SEO
        title="Pumpkin Carving Ideas and Gallery | Utah Pumpkins"
        description="Utah Pumpkins Gallery is your go-to pumpkin carving inspiration gallery." />
      <Section>
        <Constraint>
          <Columns>
            <Column className="vertical-center">
              <div>
                <h1>{heroData.title.title}</h1>
                {documentToReactComponents(
                  JSON.parse(heroData.subtitle.subtitle)
                )}
              </div>
            </Column>
            <Column>
              <StyledImg
                fluid={heroData.heroImage.fluid}
                backgroundColor={theme.colors.dark}
                alt="Utah Pumpkins Gallery - Dragon"
              />
            </Column>
          </Columns>

          <ImageCollection images={images} />

          {/* <h4 className="text-center margin-bottom-15">
            Check out these popular galleries
          </h4>
          <GalleryLinks /> */}
        </Constraint>
      </Section>
    </Layout>
  )
}

export default GalleryPage
export const pageQuery = graphql`
  query galleryQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPumpkinImage {
      edges {
        node {
          title
          description {
            description
          }
          id
          tags
          slug
          images {
            id
            description
            fluid(maxWidth: 500, quality: 90) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
    allContentfulHero(filter: { page: { eq: "gallery" } }) {
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

const StyledImg = styled(Img)``

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
