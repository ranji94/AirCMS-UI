const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const path = require('path')
const simpleOauth2 = require('simple-oauth2')
const app = express()
const config = require('./endpoints-config.json')
const middlewarePort = 9010

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// const credentials = {
//     client: {
//         id: 'identifier',
//         secret: 'password'
//     },
//     auth: {
//         tokenHost: 'backend-address',
//         tokenPath: '/login',
//         authorizePath: '/authorize'
//     }
// }

// let accessToken = {}
// const tokenConfig = {
//     scope: ["aircms-service"]
// }

// async function oauth () {
//     try {
//         const result = await oauth2.credentials.getToken(tokenConfig)
//         accessToken = oauth2.accessToken.create(result)
//     }
//     catch (error) {
//         console.error('Cannot create AuthToken')
//     }
// }

// const oauth2 = simpleOauth2.create(credentials)
// oauth()

const prefix = '/api'

const endpoints = config['endpoints']

for(let i=0;i<endpoints.length;i++) {
    const path = `${prefix}${endpoints[i]}`

    console.log('CREATED ENDPOINT: ', path)

    app.all(path, async function (req, res, next) {
        // try {
        //     if (accessToken.expired) {
        //         const result = await oauth2.clientCredentials.getToken(tokenConfig)
        //         accessToken = oauth2.accessToken.create(result)
        //     }
        //     if (!accessToken.token.access_token) {
        //         throw new Error('Server error: Token error')
        //     }
        // }
        // catch (error) {
        //     console.error(`Invalid token provided for request ${req.url}`)
        // }

        const options = {
            port: 8080,
            url: 'http://localhost:8080' + path,
            method: req.method,
            headers: {
                // 'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${accessToken.token.access_token}`,
                ...req.headers
            },
            data: req.body
        }

        await fetch(options).then(
            (response) => {
                res.send(response.data)
            },
            (error) => {
                res.status(error.response.status || 500).send({ message: error.response.data || [] })
                if(typeof error.response.status === 'undefined') {
                    console.log('Cannot get response status')
                }
            }
        ).catch()
    })
}

app.get('/api/health', (req, res) => {
    res.send('Middleware is alive!')
})

function fetch (options) {
    return new Promise((resolve, reject) => {
        axios(options)
        .then(function (response) {
            resolve(response)
        })
        .catch(function (error) {
            reject(error)
        })
    })
}

app.listen(middlewarePort, () => {
    console.log('Middleware is running on port: ', middlewarePort)
})