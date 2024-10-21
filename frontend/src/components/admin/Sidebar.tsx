"use client";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ColorSchemeToggle from '@/components/ui/ColorSchemeToggle';
import NavLink from '@/components/ui/NavLink';
import LogoutModal from '@/components/ui/LogoutModal';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import GroupRounded from "@mui/icons-material/GroupRounded";
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import { usePathname } from "next/navigation";

const SidebarItems = [
    {
        title: 'Пользователи',
        href: "/admin",
        icon: <GroupRounded />
    },
    {
        title: 'Роли',
        href: "/admin/roles",
        icon: <TuneRoundedIcon />
    },
    {
        title: 'РОПЫ',
        href: "/admin/rop",
        icon: <GroupsRoundedIcon />
    },
    {
        title: 'Чат',
        href: "/admin/chat",
        icon: <QuestionAnswerRoundedIcon />
    }
];



export default function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);
    const url = usePathname();

    useLayoutEffect(() => {
        if(url==="/admin/chat"){
            setCollapsed(true);
        }   
    }, [url]);
    

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: collapsed ? '76px' : '240px',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography level="title-lg" noWrap sx={{flex: 1 }}>
                    {!collapsed && 'Админ панель'}
                </Typography>
                <IconButton onClick={() => setCollapsed(!collapsed)} sx={collapsed ? {width:"100%"} : {ml:1}}>
                    {collapsed ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
                </IconButton>
            </Box>
            <Divider />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': '8px',
                    }}
                >
                    {SidebarItems.map((item) => (
                        <NavLink
                            title={!collapsed ? item.title : ''}
                            href={item.href}
                            icon={item.icon}
                            key={item.title}
                        />
                    ))}
                </List>
            </Box>

            <Divider />
            <ColorSchemeToggle sx={{
                paddingY: "8px"
            }}/>
            <LogoutModal admin/>
        </Sheet>
    );
}
