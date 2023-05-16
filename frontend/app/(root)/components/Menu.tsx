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


import { setAuthState } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


export default function Menu() {
    const isAuthenticated = useAppSelector((state) => state.authSliceReducer.authState);
    const dispatch = useAppDispatch();

    return (
        <>
            <List>
            {['Raids', 'Members'].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
                <ListItem key={"login"} disablePadding>
                    <ListItemButton
                        onClick={() => dispatch(setAuthState(!isAuthenticated))}
                    >
                        <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={isAuthenticated ? "Log out" : "Log in"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}