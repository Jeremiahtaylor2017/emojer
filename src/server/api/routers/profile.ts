import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";

import { filterUserForClient } from "~/server/helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
    getUserById: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            const [user] = await clerkClient.users.getUserList({
                userId: [input.userId]
            })

            if (!user) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "User not found by ID"
                })
            }
            console.log("User: ", user);
            return filterUserForClient(user);
        }),
    getUserByUsername: publicProcedure
        .input(z.object({ username: z.string() }))
        .query(async ({ input }) => {
            const [user] = await clerkClient.users.getUserList({
                username: [input.username]
            })

            if (!user) {
                const users = (await clerkClient.users.getUserList({
                    limit: 200
                }))
                const user = users.find(user => user.externalAccounts.find(email => email.emailAddress.replace(/\@.*/, '') === input.username));
                console.log(user);
                if (!user) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "User not found by username"
                    })
                }
                return filterUserForClient(user);
            }

            // if (!user) {
            //     throw new TRPCError({
            //         code: "INTERNAL_SERVER_ERROR",
            //         message: "User not found by username"
            //     })
            // }
            // console.log("user: ", user);
            // .input(z.object({ userId: z.string() }))
            // .query(async ({ input }) => {
            //     const [user] = await clerkClient.users.getUserList({
            //         userId: [input.userId]
            //     })

            //     if (!user) {
            //         throw new TRPCError({
            //             code: "INTERNAL_SERVER_ERROR",
            //             message: "User not found"
            //         })
            //     }
            //     console.log("user: ", user);

            // if (!user) {
            //     const users = (await clerkClient.users.getUserList({
            //         limit: 200
            //     }))

            //     const user = users.find(user => user.externalAccounts.find(account => account.username === input.username));

            //     if (!user) {
            //         throw new TRPCError({
            //             code: "INTERNAL_SERVER_ERROR",
            //             message: "User not found"
            //         })
            //     }

            //     return filterUserForClient(user);
            // }

            return filterUserForClient(user);
            // return user;
        })
    // getUserByUsername: publicProcedure
    //     .input(z.object({ username: z.string() }))
    //     .query(async ({ input }) => {
    //         const [user] = await clerkClient.users.getUserList({
    //             username: [input.username]
    //         })

    //         if (!user) {
    //             const users = (await clerkClient.users.getUserList({
    //                 limit: 200
    //             }))

    //             const user = users.find(user => user.externalAccounts.find(account => account.username === input.username));

    //             if (!user) {
    //                 throw new TRPCError({
    //                     code: "INTERNAL_SERVER_ERROR",
    //                     message: "User not found"
    //                 })
    //             }

    //             return filterUserForClient(user);
    //         }

    //         return filterUserForClient(user);
    //     })
});
