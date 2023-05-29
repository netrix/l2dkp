'use client'
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { checkSession } from '@/redux/actions/auth';

// source: https://jasonwatmore.com/post/2021/08/30/next-js-redirect-to-login-page-if-unauthenticated

export const basePath = '/app';    // TODO any way to get it from next.config.js ???
export const loginPageUri = '/auth/login';
export const publicPaths = [loginPageUri, '/auth/register'];    // TODO get url from common module

// TODO change any to valid types
export default function RouteGuard({ children }: {children: any}) {
    const isAuthenticated = useAppSelector((state) => state.authSliceReducer.authState);
    const isInitialized = useAppSelector((state) => state.authSliceReducer.initialized);    // TODO change JWT and drop it ?
    const dispatch = useAppDispatch();

    const router = useRouter();

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            dispatch(checkSession());
        }
    })

    useEffect(() => {
        // on initial load - run auth check - TODO use JWT (with visible exp time saved in localstorage) or make sure that isAuthenticated is set if user is logged in.
        if (isInitialized) {
            authCheck(pathname);
        }

        // // on route change start - hide page content by setting authorized to false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams, isInitialized]);

    function authCheck(url: string) {
        console.log("CHECK", pathname, searchParams, authorized)
        // redirect to login page if accessing a private page and not logged in
        const relativePath = pathname.slice(basePath.length);
        if (!isAuthenticated && !publicPaths.includes(relativePath)) {      // TODO check if logged in and don't go to signup / register
            setAuthorized(false);
            router.push(loginPageUri);
        } else {
            setAuthorized(true);
        }
    }

    if (!isInitialized) {
        // TODO show spinner
        return (
            <div>
                Loading...
            </div>
        );
    }

    // TODO add spinner when authorized is false

    return (authorized && children);
    // return children;
}