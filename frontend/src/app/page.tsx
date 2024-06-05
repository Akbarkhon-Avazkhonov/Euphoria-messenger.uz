
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'

export default function Home() {
  const cookie = cookies()
  const session = cookie.get('session')
  const role = cookie.get('role')?.value
  if (session) {
    if (role == 'OPERATOR') {
      redirect('/operator')
    } else if (role == 'ROP') {
      redirect('/rop')
    } else if (role == 'ADMIN') {
      redirect('/admin')
    } else {
      redirect('/login')
      
    }
  } else {
    redirect('/login')
  }
}