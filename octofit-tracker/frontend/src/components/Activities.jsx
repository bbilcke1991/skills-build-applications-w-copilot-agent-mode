import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchCollection('activities')
      .then((items) => {
        if (isMounted) {
          setActivities(items)
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
    return <p className="status-message">Loading activities...</p>
  }

  if (error) {
    return <p className="status-message error">{error}</p>
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <p className="eyebrow">Movement log</p>
        <h1>Activities</h1>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>User</th>
              <th>Duration</th>
              <th>Distance</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.username}-${activity.activityDate}`}>
                <td>{activity.activityType}</td>
                <td>{activity.username}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.distanceMiles ? `${activity.distanceMiles} mi` : 'n/a'}</td>
                <td>{activity.caloriesBurned}</td>
                <td>{dateFormatter.format(new Date(activity.activityDate))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities