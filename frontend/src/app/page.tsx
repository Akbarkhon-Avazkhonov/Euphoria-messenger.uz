"use client";

import { LinearProgress } from '@mui/joy';
import * as React from 'react';
import OperatorPage from './operator/page';
import Login from './login/page';

export default function Home() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [session, setSession] = React.useState<string>('');
  
  

  React.useEffect(() => {
    setSession(localStorage.getItem('session') || '');
    setLoading(false);
    },[session]);
    

 return (
  <>
    {
      loading ? (
        <LinearProgress />

      ) : (
        <div className={"fade-in"}>
            {session ? <OperatorPage /> : <Login setSession={setSession}/>}
          </div>
      )
    }
  </>
 )
}