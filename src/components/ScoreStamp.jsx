import styles from './ScoreStamp.module.css'

function tone(score) {
  if (score >= 8) return 'good'
  if (score >= 5) return 'warning'
  return 'critical'
}

export default function ScoreStamp({ score, size = 'md' }) {
  return (
    <div className={`${styles.stamp} ${styles[tone(score)]} ${styles[size]}`}>
      <span className={styles.number}>{score.toFixed(1)}</span>
      <span className={styles.label}>/ 10</span>
    </div>
  )
}
