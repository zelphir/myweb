import React from 'react'
import { Transition } from 'react-spring'
import randomColor from 'randomcolor'
import styled from 'react-emotion'
import get from 'lodash/get'
import WhatDoing from './WhatDoing'
import { Languages, Language } from './Language'
import StatsInfo from './StatsInfo'
import Spinner from '../../Spinner'

const Wrapper = styled.div`
  display: flex;
  height: 165px;
  justify-content: flex-end;
  overflow: hidden;
  padding: 0 0 0 30px;
`

class Stats extends React.PureComponent {
  componentDidMount() {
    this.props.subscribeToDailyStats()
  }

  updateBars({ percent }) {
    return {
      opacity: 1,
      height: 30,
      width: percent,
      background: randomColor({
        luminosity: 'light',
        format: 'rgba',
        hue: '#b3b300',
        alpha: 0.7
      })
    }
  }

  render() {
    const { error, loading, data } = this.props
    const languages = get(data, 'allDailyStats[0].entries', [])

    return (
      <Wrapper>
        {error || loading ? (
          <Spinner fluid />
        ) : (
          <React.Fragment>
            {!languages.length && <WhatDoing />}
            {!!languages.length && (
              <Languages>
                <Transition
                  config={{ tension: 180, friction: 10 }}
                  items={languages}
                  keys={item => item.name}
                  from={() => ({ opacity: 0, width: 0, height: 0 })}
                  enter={this.updateBars}
                  update={this.updateBars}
                  leave={() => ({ opacity: 0, height: 0, width: 0 })}
                >
                  {languages.map(language => styles => <Language styles={styles} {...language} />)}
                </Transition>
              </Languages>
            )}
          </React.Fragment>
        )}
        <StatsInfo />
      </Wrapper>
    )
  }
}

export default Stats
