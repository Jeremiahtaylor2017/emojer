import type { PropsWithChildren } from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";

export const PageLayout = (props: PropsWithChildren) => {
    const { isSignedIn } = useUser();
    return (
        <div className="flex justify-center h-screen overflow-y-auto">
            <div className="hidden md:w-32 md:flex md:flex-row md:items-end md:justify-center md:p-4">
                {isSignedIn ? (
                    <SignOutButton>
                        <button className="bg-slate-100 text-black md:p-2 rounded-full">Sign out</button>
                    </SignOutButton>
                ) : (
                    <div />
                )}
            </div>
            <main className="h-full w-full md:max-w-2xl border-slate-400 border-x">
                {props.children}
            </main>
            <div className="invisible md:visible md:w-32"></div>
        </div>
    )
}