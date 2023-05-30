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
// import Link from 'next/link';
import { useRouter } from "next/navigation";
import ProtectedLink from '@/app/components/ProtectedLink';

import { logoutUser } from '@/redux/actions/auth';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


function LoggedOutMenuElements() {
    return (
        <List>
            <ListItem key={"login"} disablePadding>
                <ProtectedLink
                    href={"/auth/login"}
                    passHref
                    legacyBehavior
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log in" />
                    </ListItemButton>
                </ProtectedLink>
            </ListItem>
        </List>
    );
}


function LoggedInMenuElements() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <List>
            {/* TODO add profile button */}
            <ListItem key={"logout"} disablePadding>
                <ListItemButton
                    onClick={() => {
                        dispatch(logoutUser({}));
                    }}
                >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </ListItemButton>
            </ListItem>
        </List>
    );
}


export default function Menu() {
    const isAuthenticated = useAppSelector((state) => state.authSliceReducer.authState);

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
                    <ProtectedLink
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
                    </ProtectedLink>
                </ListItem>
            ))}
            </List>
            <Divider />
            {
                isAuthenticated
                ? <LoggedInMenuElements />
                : <LoggedOutMenuElements />
            }
        </>
    )
}