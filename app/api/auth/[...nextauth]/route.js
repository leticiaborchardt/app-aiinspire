import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '',
            clientSecret: '',
        })
    ],
    callbacks: {
        async session({session}) {
    
        },
        async signIn({profile}) {
    
        }
    }
})

export {handler as GET, handler as POST};