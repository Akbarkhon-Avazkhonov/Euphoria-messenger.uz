
import { redirect } from 'next/navigation';
import HomePage from './main/HomePage';
import { cookies } from 'next/headers'

export default function Home() {
  const cookie = cookies()
  const session = cookie.get('session')
  if (session) {
    redirect('/admin')
  } else {
    redirect('/login')
  }
}