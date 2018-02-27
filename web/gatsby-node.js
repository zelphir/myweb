const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  const blogPost = path.resolve('./src/templates/blog-post.js')
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors) // eslint-disable-line
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  _.each(posts, (post, index) => {
    const previous = index === posts.length - 1 ? false : posts[index + 1].node
    const next = index === 0 ? false : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next
      }
    })
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === 'MarkdownRemark') {
    const relativeFilePath = createFilePath({ node, getNode })

    createNodeField({
      name: 'slug',
      node,
      value: `/tidbits${relativeFilePath}`
    })
  }
}

exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  if (page.path.match(/^\/photos/)) {
    page.layout = 'photosLayout'
    createPage(page)
  }
}
