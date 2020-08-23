import ListTypeContext from '../context/ListTypeContext'

const ListTypeSwitcher = props => {
    const handleClick = e => {
        props.setListType(e.currentTarget.value)
    }

    return (
        <div className="switch">
            <button className={props.listType === 'card' ? 'active' : ''} onClick={handleClick} value={'card'}>
                <img src="/svg/card-icon.svg"/>
            </button>
            <button className={props.listType === 'list' ? 'active' : ''} onClick={handleClick} value={'list'}>
                <img src="/svg/list-icon.svg"/>
            </button>
            <style jsx>{`
                .switch {
                    width: fit-content;
                    user-select: none;
                }
                button {
                    border: none;
                    outline: 0;
                    padding: 6px 10px;
                    border-radius: 4px;
                    transition: background-color 0.07s;
                }
                button:hover {
                    background-color: #dcdde1;
                }
                button.active {
                    background-color: #D5D5D8;
                }
            `}</style>
        </div>
    )
}
const ContextWrapper = () => {
    return (
        <ListTypeContext.Consumer>
            {({listType, setListType}) => (
                <ListTypeSwitcher 
                    listType={listType}
                    setListType={setListType}
                />
            )}
        </ListTypeContext.Consumer>
    )
}
export default ContextWrapper