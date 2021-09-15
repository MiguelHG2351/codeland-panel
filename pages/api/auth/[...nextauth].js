import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";

// console.log(process.env.JWT_SECRET);
const options = {
    theme: 'dark',
    debug: true,
    providers: [
        Providers.Credentials({
            name: 'Codeland',
            credentials: {
                password: {
                    type: 'password',
                    label: 'Ingrese la contraseña',
                }
            },
            async authorize(credentials) {
                // connect api
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/auth_signin`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const user = await res.json()
                if(res.ok && user) {
                    return user
                }
                return null;
            }
        })
    ],
    session: {
        jwt: true,
    },
    
    jwt: {
        secret: process.env.JWT_SECRET,
        encryption: true,
        verificationOptions: {
            algorithms: ['HS256']
         },
        encode: async ({ secret, token }) => {
            const jwtClaims = {
                name: token.name,
                email: token.email,
                "iat": Date.now() / 1000,
            }

            const encodedToken = jwt.sign(jwtClaims , secret, {
                algorithm: 'HS256',
                expiresIn: '1h'
             })
            return encodedToken;
        },

        async decode({ secret, token }) {
            const decoded = jwt.verify(token, secret, {
                algorithms: ['HS256'],
            });
            return decoded;
        }
    },
    callbacks: {
        async session(session, token) {
            // console.log(session, token);
            return await Promise.resolve(session)
        },

        async jwt(token, user) {
            // const isUserSignedIn = user ? true: false;
            if(user) {
                return user;
            }
            return await Promise.resolve(token)
        }
    }
}

export default NextAuth(options);
