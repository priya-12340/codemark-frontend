import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { getReviewById } from '../services/api'
import TopNav from '../components/TopNav'
import ScoreStamp from '../components/ScoreStamp'
import styles from './ReviewDetail.module.css'

const SEVERITY_LABEL = {
  critical: 'Critical',
  warning: 'Warning',
  minor: 'Minor'
}

export default function ReviewDetail() {
  const { id } = useParams()
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getReviewById(id)
      .then(setReview)
      .catch(() => setError('Could not load this review.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className={styles.page}>
        <TopNav />
        <p className={styles.status}>Loading review…</p>
      </div>
    )
  }

  if (error || !review) {
    return (
      <div className={styles.page}>
        <TopNav />
        <p className={styles.error}>{error || 'Review not found.'}</p>
        <Link to="/dashboard" className={styles.back}>← Back to dashboard</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <TopNav />
      <div className={styles.content}>
        <Link to="/dashboard" className={styles.back}>← Back to dashboard</Link>

        <div className={styles.header}>
          <ScoreStamp score={review.score} size="lg" />
          <div>
            <h1 className={styles.title}>{review.language} review</h1>
            <p className={styles.date}>
              {new Date(review.createdAt).toLocaleDateString(undefined, {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.codeColumn}>
            <h2 className={styles.sectionTitle}>Submitted code</h2>
            <div className={styles.editorFrame}>
              <Editor
                height="480px"
                language={review.language}
                theme="vs-dark"
                value={review.code}
                options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13 }}
              />
            </div>
          </div>

          <div className={styles.issuesColumn}>
            <h2 className={styles.sectionTitle}>
              {review.issues.length} issue{review.issues.length === 1 ? '' : 's'} found
            </h2>

            {review.issues.length === 0 && (
              <p className={styles.clean}>Nothing flagged. Clean pass.</p>
            )}

            {review.issues.map((issue, i) => (
              <div key={i} className={`${styles.issue} ${styles[issue.severity]}`}>
                <div className={styles.issueHeader}>
                  <span className={styles.badge}>{SEVERITY_LABEL[issue.severity] || issue.severity}</span>
                </div>
                <p className={styles.issueDesc}>{issue.description}</p>
                {issue.suggestedFix && (
                  <pre className={styles.fix}>{issue.suggestedFix}</pre>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
