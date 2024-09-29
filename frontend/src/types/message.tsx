type UserProps = {
    name: string;
    username: string;
    avatar: string;
    online: boolean;
  };
  
type MessageProps = {
    id: string;
    message: string;
    out: boolean;
    date: string;
    unread?: boolean;
    media?: any;
  };
  
type ChatProps = {
    id: string;
    userId: string;
    title: string;
  
  };
  