import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PageNav from '../components/PageNav';

import { Container } from '../basics/Layout';
import { Link } from '../basics/Link';
import { Paragraph, Block, Heading, Small } from '../basics/Text';

const PostTitleEl = styled(Heading)`
  margin-bottom: 0;
`;
const PostDescription = styled(Paragraph)`
  margin-top: 0;
`;

const IndexPage = ({ data }) => {
  const { title, description } = data.site.siteMetadata;
  return (
    <Layout title={title}>
      <Container>
        <SEO
          title="Home"
          keywords={[`gatsby`, `application`, `react`]}
        />

        <Paragraph>{description}</Paragraph>
        <PageNav />
        {data.allMarkdownRemark.edges
          .map(({ node }) => node)
          .sort(
            (a, b) =>
              new Date(b.frontmatter.date) -
              new Date(a.frontmatter.date),
          )
          .map(({ fields, frontmatter }) => (
            <Block key={fields.slug}>
              <PostTitleEl>
                <Link to={fields.slug}>{frontmatter.title}</Link>
              </PostTitleEl>

              <PostDescription>
                <Small>
                  {frontmatter.date}, {frontmatter.ago}
                </Small>
                <br />
                {frontmatter.description}
              </PostDescription>
            </Block>
          ))}
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            published
            title
            description
            date(formatString: "YYYY-MM-DD")
            ago: date(fromNow: true)
          }
        }
      }
    }
  }
`;
