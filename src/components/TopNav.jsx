import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './TopNav.module.css'

export default function TopNav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className={styles.nav}>
      <Link to="/dashboard" className={styles.wordmark}>Codemark</Link>
      <div className={styles.right}>
        {user?.name && <span className={styles.user}>{user.name}</span>}
        <button className={styles.logout} onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  )
}
