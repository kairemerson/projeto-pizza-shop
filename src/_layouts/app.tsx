import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <div className="flex min-h-screen antialiased flex-col">
            <Header/>

            <div className="flex flex-1 flex-col gap-4 p-8 pt-4">
                <Outlet/>
            </div>
        </div>
    )
}