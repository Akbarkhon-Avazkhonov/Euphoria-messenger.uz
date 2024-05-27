export type UserProps = {
  name: string;
  username: string;
  avatar: string;
  online: boolean;
};

export type MessageProps = {
  id: string;
  message: string;
  out: boolean;
  date: string;
  unread?: boolean;
  attachment?: {
    fileName: string;
    type: string;
    size: string;
  };
};

export type ChatProps = {
  id: string;
  userId: string;
  title: string;

};
