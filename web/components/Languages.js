import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { GetTodayLanguages } from 'gql/queries.graphql'
import { startOfToday, endOfToday } from 'date-fns'

const Languages = ({ data: { loading, error, allLanguages } }) => {
  if (error) return <div>Error</div>
  if (loading) return <div>Loading...</div>

  if (allLanguages && allLanguages.length) {
    return (
      <section>
        <ul>
          {allLanguages.map(post => (
            <li key={post.id}>
              <div>
                <span>{post.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return null
}

Languages.propTypes = {
  data: PropTypes.object.isRequired
}

const variables = { from: startOfToday().toISOString(), to: endOfToday().toISOString() }

export default graphql(GetTodayLanguages, {
  options: { variables },
  props: ({ data }) => ({
    data
  })
})(Languages)
