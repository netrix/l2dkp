import Link from 'next/link';
import {publicPaths, basePath, loginPageUri} from "./RouteGuard";
import { useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";


export default function ProtectedLink({children, ...props}: any) {
    const isAuthenticated = useAppSelector((state) => state.authSliceReducer.authState);
    const pathname = usePathname();

    if (isAuthenticated) {
        return (
            <Link
                {...props}
            >
                {children}
            </Link>
        )
    }


    const relativePath = pathname.slice(basePath.length);   // TODO make function out of this line
    console.log("DUPA", relativePath, publicPaths, publicPaths.includes(relativePath));
    if (publicPaths.includes(relativePath)) {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <Link
            href={loginPageUri}
            {...props}
        >
            {children}
        </Link>
    )
}