import type { NextApiHandler } from 'next'

const crendetialsAuth: NextApiHandler<User> = (request, response) => {
    if(request.method !== 'POST') {
        response.status(405).end()
        return;
    }

    if(request.body.password === process.env.PASSWORD_AUTH) {
        const user: User = {
            csrfToken: request.body.csrfToken,
            name: 'el ADMIN',
            email: request.body.email,
            image: ''
        }

        return response.status(200).json(user)
    }

    response.status(401).end()
}

export default crendetialsAuth
