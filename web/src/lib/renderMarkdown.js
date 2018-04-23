import React from 'react'
import Remarkable from 'remarkable'
import RemarkableReactRenderer from 'remarkable-react'
import RouterLink from '../components/RouterLink'
import ContactForm from '../components/ContactForm'

/**
 * Registers a custom token to be parsed by Remarkable,
 * then handed off to Remarkable-React for rendering:
 * https://github.com/HHogg/remarkable-react/issues/6
 */
const addCustomMarkdownToken = (remarkable, tag) => {
  if (!remarkable || !tag || typeof tag !== 'string') return
  remarkable.inline.ruler.push(tag, (state, silent) => {
    if (state.src.substr(state.pos, tag.length) !== tag) return false
    if (!silent) {
      state.push({ type: tag, text: state.src, level: state.level })
    }
    state.pos += tag.length
    return true
  })
}

const addCustomMarkdownTokens = (remarkable, tags) => {
  if (!remarkable || !tags || !tags.length) return

  if (typeof tags === 'string') {
    addCustomMarkdownToken(remarkable, tags)
  } else if (Array.isArray(tags)) {
    tags.forEach(tag => {
      addCustomMarkdownToken(remarkable, tag)
    })
  }
}

/**
 * Parses a customComponents object that contains tokens as keys,
 * and custom React components as values.
 * For example:
 * {
 *   '%example1%': () => (<MyComponent>Example 1</MyComponent>),
 *   '%example2%': () => (<MyOtherComponent>Example 2</MyOtherComponent>)
 * }
 * Automatically registers the tokens with Remarkable so that they can be parsed
 * and rendered into their associated components.
 */
const createTokensFromCustomComponents = (remarkable, customComponents) => {
  if (!remarkable || !customComponents) return {}
  const tokens = Object.keys(customComponents)
  addCustomMarkdownTokens(remarkable, tokens)
  const customTokens = {}
  tokens.forEach(token => {
    customTokens[token] = token
  })
  return customTokens
}

const fixNestingWarnings = {
  // replace '<p>' with '<div>' to prevent React nesting warnings
  // only for custom components that are not RouterLink
  // eslint-disable-next-line
  p: ({ children }) =>
    children.some(
      element =>
        element && typeof element.type === 'function' && element.type.displayName !== 'RouterLink'
    ) ? (
      <React.Fragment>{children}</React.Fragment>
    ) : (
      <p>{children}</p>
    )
}

const defaultCustomComponents = {
  a: RouterLink,
  '% contact-form': ContactForm
}

export default (markdownSource, customComponents = {}) => {
  const rm = new Remarkable()
  const customTokens = createTokensFromCustomComponents(rm, {
    ...defaultCustomComponents,
    ...customComponents
  })

  rm.renderer = new RemarkableReactRenderer({
    components: {
      ...fixNestingWarnings,
      ...defaultCustomComponents,
      ...customComponents
    },
    tokens: { ...customTokens }
  })

  return {
    render: rm.render(markdownSource),
    inline: rm.renderInline(markdownSource)
  }
}
