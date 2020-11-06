import { createContext, useState, useEffect } from 'react'

const Context = createContext()

const ListTypeProvider = props => {
    const [listType, setListType] = useState()
    
    const setupType = type => {
        setListType(type)
        localStorage.setItem('listType', type)
    }

    useEffect(() => {
        const localListType = localStorage.getItem('listType')

        if (localListType === null) {
            setupType('card')
        } else {
            setupType(localListType)
        }
    })
    
    return (
        <Context.Provider value={{
            listType: listType,
            setListType: setupType
        }}>
            {props.children}
        </Context.Provider>
    )
}
export default {
    Provider: ListTypeProvider,
    Consumer: Context.Consumer,
    Original: Context
}