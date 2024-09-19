'use client';
import { ListItem, ListItemButton, ListItemContent, Typography } from "@mui/joy";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    title: string;
    href: string;
    icon: React.ReactNode; 
}
export default  function NavLink(
    props: NavLinkProps 
) {
    const url = usePathname();
    return (
        <Link 
        href={
            props.href
        }
        style={
            {
                textDecoration: 'none',
                color: 'inherit'
            }
        }
        >
        <ListItem>
        <ListItemButton selected={
            url === props.href
        } sx={!props.title ? {gap: 0,paddingY:'8px'} : {gap:1,padding: '8px'}} >
          {
            props.icon 
          }
          <ListItemContent>
            <Typography level="title-sm">
                {
                    props.title
                }
            </Typography>
          </ListItemContent>
        </ListItemButton>
      </ListItem>
      </Link>
    );
}