import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup as signupApi } from '../services/api'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await signupApi(name, email, password)
      login(data.token, data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create your account. Try a different email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.side}>
        <div className={styles.wordmark}>Codemark</div>
        <h1 className={styles.headline}>Ship the fix,<br />not the follow-up bug.</h1>
        <p className={styles.sub}>
          Every review comes back with a score, a severity-ranked issue list, and a suggested
          fix you can act on right away — no back-and-forth needed.
        </p>
        <div className={styles.marginNote}>
          <span className={styles.marginDot} />
          suggested fix — see line 42
        </div>
      </div>

      <div className={styles.formSide}>
        <form className={styles.card} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Create your account</h2>
          {error && <div className={styles.error}>{error}</div>}

          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </label>

          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>

          <button className={styles.submit} type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </button>

          <p className={styles.switch}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
