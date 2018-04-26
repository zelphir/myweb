import React from 'react'
import Seo from '../components/Seo'
import PhotoList from '../components/Photo/List'
import Main from '../components/Main'

const title = 'Photos'
const description = 'Some of the photos taken around the World...'

const Photos = () => (
  <Main id="photos" photos>
    <Seo title={title} description={description} path="/photos" />
    <h1>{title}</h1>
    <p>{description}</p>
    <PhotoList />
  </Main>
)

export default Photos
