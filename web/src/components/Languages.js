import React from 'react'
import get from 'lodash.get'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { startOfToday, endOfToday } from 'date-fns'
import isEqual from 'lodash.isequal'

import { GetTodayLanguages } from 'gql/queries.graphql'
import { OnLanguagesUpdate } from 'gql/subscriptions.graphql'
import Language from './Language'

import './Languages.scss'

class Languages extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    subscribeToLanguages: PropTypes.func
  }

  state = {
    showBars: sessionStorage.getItem('showBars') || false
  }

  componentDidMount() {
    this.props.subscribeToLanguages()
    this.delayShowBars()
  }

  componentWillUnmount() {
    clearTimeout(this.delay)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const prevLanguages = this.getEntries(this.props.data)
    const nextLanguages = this.getEntries(nextProps.data)

    return !isEqual(nextLanguages, prevLanguages) || nextState.showBars !== this.state.showBars
  }

  delayShowBars() {
    this.delay = setTimeout(
      () => this.setState({ showBars: true }, sessionStorage.setItem('showBars', true)),
      1000
    )
  }

  renderWhatDoing() {
    const d = new Date()
    const dayOfWeek = d.getDay()
    const hour = d.getHours()
    const isMonFri = dayOfWeek > 0 && dayOfWeek < 6
    const isFromTo = (from, to) => hour > from && hour < to

    switch (true) {
      case isFromTo(0, 9):
        return <div>Probably sleeping...</div>
      case isMonFri && isFromTo(18, 20):
        return <div>Probably training...</div>
      case isFromTo(20, 22):
        return <div>Probably eating...</div>
      default:
        return <div>Probably resting...</div>
    }
  }

  getEntries(data) {
    return get(data.allLanguages, '[0].entries', [])
  }

  render() {
    const { data } = this.props
    const { showBars } = this.state

    if (data.error) return <div>Error...</div>
    if (data.loading) return <div>Loading...</div>

    const languages = [...this.getEntries(data)].sort((a, b) => b.percent - a.percent)

    if (!languages.length) return this.renderWhatDoing()

    return languages.map(({ name, percent, text }) => {
      const languageProps = {
        id: name.replace(/\s/g, '').toLowerCase(),
        width: showBars ? `${percent}%` : 0,
        name,
        text
      }

      return <Language key={languageProps.id} {...languageProps} />
    })
  }
}

const variables = { from: startOfToday().toISOString(), to: endOfToday().toISOString() }

export default graphql(GetTodayLanguages, {
  options: { variables },
  props: ({ data }) => ({
    data,
    subscribeToLanguages: () => {
      return data.subscribeToMore({
        document: OnLanguagesUpdate,
        updateQuery: (prev, { subscriptionData: { data } }) => !data && prev
      })
    }
  })
})(Languages)
