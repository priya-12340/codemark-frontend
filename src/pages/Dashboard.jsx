import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getReviews } from '../services/api'
import TopNav from '../components/TopNav'
import ScoreStamp from '../components/ScoreStamp'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getReviews()
      .then(setReviews)
      .catch(() => setError('Could not load your review history. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className={styles.page}>
      <TopNav />
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Your reviews</h1>
            <p className={styles.subtitle}>
              {reviews.length > 0
                ? `${reviews.length} review${reviews.length === 1 ? '' : 's'} on file`
                : 'Nothing reviewed yet'}
            </p>
          </div>
          <Link to="/reviews/new" className={styles.newButton}>+ New review</Link>
        </div>

        {loading && <p className={styles.status}>Loading…</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && reviews.length === 0 && (
          <div className={styles.empty}>
            <p>No code has come across the desk yet.</p>
            <Link to="/reviews/new" className={styles.emptyLink}>Submit your first file →</Link>
          </div>
        )}

        <div className={styles.grid}>
          {reviews.map((r) => (
            <Link to={`/reviews/${r.id}`} key={r.id} className={styles.card}>
              <ScoreStamp score={r.score} />
              <div className={styles.cardBody}>
                <span className={styles.lang}>{r.language}</span>
                <span className={styles.date}>
                  {new Date(r.createdAt).toLocaleDateString(undefined, {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
