import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";

const options = {
    theme: 'dark',
    debug: true,
    session: {
        jwt: true,
    },
    secret: process.env.JWT_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
        encryption: true,
        enconde: async ({ secret, token, maxAge }) => {
            const jwtClaims = {
                'sub': token.sub.toString(),
                name: token.name,
                email: token.email,
                "iat": Date.now() / 1000,
            }

            const encodedToken = jwt.sign(jwtClaims , secret, {
                algorithm: 'HS256',
             })

            return encodedToken;
        },

        async decode({ secret, token }) {
            const decoded = jwt.verify(token, { secret }, {
                algorithms: ['HS256'],
            });

            return decoded;
        }
    },
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
    callbacks: {
        async session(session, token) {
            const encodedToken = jwt.sign(token, process.env.JWT_SECRET, {
                algorithm: 'HS256',
                expiresIn: '1h'
            })
            session.id = token.id
            session.token = encodedToken
            return Promise.resolve(session)
        },

        async jwt(token, user) {
            const isUserSignedIn = user ? true: false;

            return Promise.resolve(token)
        }
    }
}

export default NextAuth(options);
