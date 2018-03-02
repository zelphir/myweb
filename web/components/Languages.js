import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { GetTodayLanguages } from 'gql/queries.graphql'
import { OnLanguagesUpdate } from 'gql/subscriptions.graphql'
import { startOfToday, endOfToday } from 'date-fns'

class Languages extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    languages: PropTypes.array.isRequired,
    subscribeToNewLanguages: PropTypes.func
  }

  componentDidMount() {
    this.props.subscribeToNewLanguages()
  }

  render() {
    const { data: { loading, error }, languages } = this.props
    console.log({ loading, error, languages }) // eslint-disable-line
    return <div>...</div>
    // if (error) return <div>Error</div>
    // if (loading) return <div>Loading...</div>

    // return (
    //   <div>
    //     {languages.entries.map(lang => (
    //       <div key={lang.name}>
    //         {lang.name} - {lang.percent}
    //       </div>
    //     ))}
    //   </div>
    // )
  }
}

const variables = { from: startOfToday().toISOString(), to: endOfToday().toISOString() }

export default graphql(GetTodayLanguages, {
  name: 'languages',
  options: { variables },
  props: props => {
    return {
      data: props.languages,
      languages: props.languages.allLanguages[0] || [],
      subscribeToNewLanguages: () => {
        return props.languages.subscribeToMore({
          document: OnLanguagesUpdate,
          updateQuery: (prev, { subscriptionData }) => {
            console.log({ subscriptionData }) // eslint-disable-line
          }
        })
      }
    }
  }
})(Languages)
