import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout(props: { children: React.ReactNode }) {
    const cookie = cookies()
    const session = cookie.get('session')
    if(!session){
      return (
        <div className="fade-in">
            {props.children}
        </div>
      );}
    
    
  }