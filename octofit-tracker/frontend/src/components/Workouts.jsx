import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpointPath = '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchCollection(endpointPath)
      .then((items) => {
        if (isMounted) {
          setWorkouts(items)
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
    return <p className="status-message">Loading workouts...</p>
  }

  if (error) {
    return <p className="status-message error">{error}</p>
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      <div className="data-grid workouts-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.name}>
            <div className="card-title-row">
              <h2>{workout.name}</h2>
              <span className="pill">{workout.difficulty}</span>
            </div>
            <p className="muted">{workout.focusArea}</p>
            <dl>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} minutes</dd>
              </div>
              <div>
                <dt>Exercises</dt>
                <dd>{workout.exercises?.join(', ')}</dd>
              </div>
              <div>
                <dt>Recommended for</dt>
                <dd>{workout.recommendedFor?.join(', ')}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts