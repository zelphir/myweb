import React from 'react'
import PropTypes from 'prop-types'
import withPosts from 'nextein/posts'
import { Content } from 'nextein/post'
import Link from 'nextein/link'

import withData from '../lib/withData'
import MainLayout from '../layouts/MainLayout'
import Languages from '../components/Languages'

const dashes = str => str.toLowerCase().replace(' ', '-')

const Index = ({ posts }) => (
  <MainLayout>
    <section>
      {posts.map(post => (
        <article key={`post-${dashes(post.data.title)}`}>
          <header>
            <h2>
              <Link {...post}>
                <a>{post.data.title}</a>
              </Link>
            </h2>
          </header>
          <Content {...post} excerpt />
        </article>
      ))}
    </section>
    <Languages />
  </MainLayout>
)

Index.propTypes = {
  posts: PropTypes.array.isRequired
}

export default withData(withPosts(Index))
