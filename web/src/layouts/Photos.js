import React from 'react'
import Seo from '../components/Seo'
import PhotoList from '../components/Photo/List'

const title = 'Photos'
const description = 'Some of the photos taken around the World...'

const Photos = () => (
  <main id="photos">
    <Seo title={title} description={description} path="/photos" />
    <h1>{title}</h1>
    <p>{description}</p>
    <PhotoList />
  </main>
)

export default Photos
