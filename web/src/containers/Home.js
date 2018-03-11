import React from 'react'
import { withSiteData } from 'react-static'

export default withSiteData(() => (
  <div>
    <h1>Home</h1>
    <p>
      Home <a href="/">Home - link</a>
      <blockquote>
        <p>aaa</p>
        <p>aaa</p>
        <p>aaa</p>
      </blockquote>
      <code>bbb</code>
      <ul>
        <li>a</li>
        <li>a</li>
        <li>a</li>
      </ul>
      <ol>
        <li>a</li>
        <li>a</li>
        <li>a</li>
      </ol>
      <dl>
        <dt>Coffee</dt>
        <dd>- black hot drink</dd>
        <dt>Milk</dt>
        <dd>- white cold drink</dd>
      </dl>
    </p>
  </div>
))
