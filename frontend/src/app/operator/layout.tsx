import { cookies } from "next/headers";

export default function Layout(props: { children: React.ReactNode }) {
    const cookie = cookies()
    const role = cookie.get('role')?.value
    if(role == 'OPERATOR'){
      return (
        <div className="fade-in">
            {props.children}
        </div>
      );}
    
    
  }