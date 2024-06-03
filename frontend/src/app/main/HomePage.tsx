"use client";
import { LinearProgress } from '@mui/joy';
import * as React from 'react';
import OperatorPage from '../operator/main';
import Login from '../login/Login';
import Loading from '../loading';

export default function HomePage() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [session, setSession] = React.useState<string>('');
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setSession(window.localStorage.getItem('session') || '');
    }
    setLoading(false);
  },[session]);
    
 return (
  <>
    {
      loading ? (
        <Loading />
      ) : (
        <div className={"fade-in"}>
            {session ? <OperatorPage /> : <Login setSession={setSession}/>}
          </div>
      )
    }
  </>
 )
}