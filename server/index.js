const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const path = require('path')
const simpleOauth2 = require('simple-oauth2')
const fs = require('fs')
const app = express()
const config = require('./endpoints-config.json')

const middlewarePort = 9010
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public/images"));

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
    const endpointPath = `${prefix}${endpoints[i]}`

    console.log('CREATED ENDPOINT: ', endpointPath)

    app.all(endpointPath, async function (req, res, next) {
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

        const isImage = endpointPath.includes('image') ? true : false

        const options = {
            port: 8080,
            url: 'http://localhost:8080' + endpointPath,
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${accessToken.token.access_token}`,
                ...req.headers
            },
            data: req.body,
            params: req.query,
            responseType: 'arraybuffer'
        }

        await fetch(options).then(
            (response) => {
                if(isImage) {
                    const sendFileOptions = {
                        root: path.join(__dirname, 'public/images'),
                        dotfiles: 'deny',
                        headers: {
                            'x-timestamp': Date.now(),
                            'x-sent': true,
                            'Content-Type': 'image/jpeg'
                        }
                    }
                    const fileName = req.query.fileName
                    const absoluteFilePath = path.join(__dirname, 'public/images') + '/' + fileName
                    console.log(absoluteFilePath)
                    const imageFile = Buffer.from(response.data, 'binary').toString('base64')

                    fs.writeFileSync(absoluteFilePath, imageFile)

                    res.type('jpeg')
                    res.contentType('image/jpeg')
                    res.sendFile(fileName, sendFileOptions, function(err) {
                        if (err) {
                            next(err)
                          } else {
                            console.log('Sent:', fileName)
                          }
                    })
                }
                else {
                    res.send(response.data)
                }
            },
            (error) => {
                let errorStatus = typeof error.response === 'undefined' ? 500 : error.response.status                

                res.status(errorStatus).send({ message: error.response.data || [] })
                if(typeof error.response.status === 'undefined') {
                    console.log('Cannot get response status')
                }
            }
        ).catch()
    })
}

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

app.get('/api/health', (req, res) => {
    res.send('Middleware is alive!')
})

app.listen(middlewarePort, () => {
    console.log('Middleware is running on port: ', middlewarePort)
})
