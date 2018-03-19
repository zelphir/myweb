import { cleanLanguagesUp } from 'shared/apollo'

// Clean non used languages
;(async () => {
  try {
    return cleanLanguagesUp()
  } catch (err) {
    console.error(err) // eslint-disable-line
  }
})()
