import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpointPath = '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchCollection(endpointPath)
      .then((items) => {
        if (isMounted) {
          setTeams(items)
          setError('')
        }
      })
      .catch((loadError) => {
        if (isMounted) {
          setError(loadError.message)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return <p className="status-message">Loading teams...</p>
  }

  if (error) {
    return <p className="status-message error">{error}</p>
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </div>
      <div className="data-grid teams-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <p className="muted">Mascot: {team.mascot}</p>
            <dl>
              <div>
                <dt>Weekly goal</dt>
                <dd>{team.weeklyGoalMinutes} minutes</dd>
              </div>
              <div>
                <dt>Members</dt>
                <dd>{team.members?.join(', ')}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams