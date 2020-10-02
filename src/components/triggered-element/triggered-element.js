import React from 'react'

export const TriggeredElement = ({ elementSwitch, children, contentEdit }) => {
    return elementSwitch ? contentEdit : children
}