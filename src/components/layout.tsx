import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
    return (
        <main className="flex justify-center h-screen overflow-y-auto">
            <div className="h-full w-full md:max-w-2xl border-slate-400 border-x">
                {props.children}
            </div>
        </main>
    )
}