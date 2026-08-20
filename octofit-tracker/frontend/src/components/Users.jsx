import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpointPath = '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchCollection(endpointPath)
      .then((items) => {
        if (isMounted) {
          setUsers(items)
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
    return <p className="status-message">Loading users...</p>
  }

  if (error) {
    return <p className="status-message error">{error}</p>
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </div>
      <div className="data-grid users-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.username}>
            <div>
              <h2>{user.firstName} {user.lastName}</h2>
              <p className="muted">@{user.username}</p>
            </div>
            <dl>
              <div>
                <dt>Email</dt>
                <dd>{user.email}</dd>
              </div>
              <div>
                <dt>Fitness level</dt>
                <dd>{user.fitnessLevel}</dd>
              </div>
              <div>
                <dt>Team</dt>
                <dd>{user.teamName}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users