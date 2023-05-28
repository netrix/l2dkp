"use client";

import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link';


import { setAuthState } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


export default function Menu() {
    const isAuthenticated = useAppSelector((state) => state.authSliceReducer.authState);
    const dispatch = useAppDispatch();

    return (
        <>
            <List>
            {[
                {
                    title: 'Raids',
                    link: "/raids"
                },
                {
                    title: 'Members',
                    link: "/members"
                }
            ].map(({title, link}, index) => (
                <ListItem key={title} disablePadding>
                    <Link
                        href={link}
                        passHref
                        legacyBehavior
                    >
                        <ListItemButton>
                            <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
                <ListItem key={"login"} disablePadding>
                    <Link
                        href={"/auth/login"}
                        passHref
                        legacyBehavior
                    >
                        <ListItemButton
                            // onClick={() => dispatch(setAuthState(!isAuthenticated))}
                            // onClick={useRouter.replace("/auth")}
                        >
                            <ListItemIcon>
                            <InboxIcon />
                            </ListItemIcon>
                            {/* TODO change to 2 buttons - "Profile" and "Log out" when authenticated */}
                            <ListItemText primary={isAuthenticated ? "Log out" : "Log in"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
        </>
    )
}