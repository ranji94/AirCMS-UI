import axios from 'axios';
import STRINGS from './resources/data/strings.json';
import { MONTHS } from './constants'

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

export function convertToHumanDateRepresentation (dateFieldString) {
    const dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/
    const groups = dateFieldString.match(dateRegexp).groups
    
    return (cutLessSignificantZero(groups.day) + ' ' + MONTHS[cutLessSignificantZero(groups.month)] + ' ' + groups.year) || '01 January 1970'
}

export function cutLessSignificantZero (month) {
    return month.length === 2 && month.substring(0,1) === '0' ? month.substring(1,2) : month
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