import get from 'lodash.get'
import { createSelector } from 'reselect'

const getEntries = data => get(data, 'allLanguages[0].entries', [])

export const getLanguages = createSelector(getEntries, entries =>
  [...entries]
    .sort((a, b) => b.percent - a.percent)
    .filter(({ percent }) => percent > 1)
    .slice(0, 5)
)
