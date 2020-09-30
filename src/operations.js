import axios from 'axios';
import STRINGS from './resources/data/strings.json';

export function loadText(stringCode, ...args) {
    let text = ''

    STRINGS.map(tx => {
        if (tx.stringCode === stringCode) {
            text = tx.value
        }
    })

    args.forEach(arg => {
        text = text.replace('${val}', arg)
    })

    return text
}

export function getStringCodeByText(value, resource) {
    let sc = ''
    const res = typeof resource === 'undefined' ? STRINGS : resource

    res.map(tx => {
        if (tx.value === value) {
            sc = tx.stringCode
        }
    })

    return sc
}

export function getRandomBooleanWithProbability(probability) {
    return probability > Math.random()
}

export function fetch (options) {
    const defaultOpts = {
        hostname: window.location.hostname,
        url: '',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {}
    }

    const targetOpts = Object.assign({}, defaultOpts, options)

    return new Promise((resolve, reject) => {
        axios(targetOpts)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(error.response)
        })
    }).catch()
}