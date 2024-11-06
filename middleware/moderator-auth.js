
import jwtDecode from 'jwt-decode'
export default function({store, redirect}) {

  const token = store.getters['auth/token']
  if (!token) {
    redirect('/login?message=login')
  }
  const jwtData = jwtDecode(token) || {}
  const role = jwtData.role || 'user'
  if (!['admin','moderator'].includes(role)) {
    redirect('/cabinet')
  }
}
