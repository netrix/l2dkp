'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";


export default function Home() {
    const isAuthenticated = useAppSelector((state) => state.authSliceReducer.authState);
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/raids");
        } else {
            router.replace("/auth/login");
        }
    })

    return "Loading..."
}
