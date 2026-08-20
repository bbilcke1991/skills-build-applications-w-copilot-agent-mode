import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchCollection('leaderboard')
      .then((items) => {
        if (isMounted) {
          setEntries(items)
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
    return <p className="status-message">Loading leaderboard...</p>
  }

  if (error) {
    return <p className="status-message error">{error}</p>
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="leaderboard-list">
        {entries.map((entry) => (
          <article className="leaderboard-row" key={entry._id ?? entry.username}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.username}</h2>
              <p className="muted">{entry.weeklyMinutes} weekly minutes</p>
            </div>
            <div className="score-block">
              <strong>{entry.totalPoints}</strong>
              <span>{entry.streakDays} day streak</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard