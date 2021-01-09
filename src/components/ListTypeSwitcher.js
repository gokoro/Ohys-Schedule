import { useRecoilState } from 'recoil'
import { BsViewList, BsList } from 'react-icons/bs'

import { animeListTypeState } from '../states/animeListType'

const ListTypeSwitcher = () => {
    const [ listType, setListType ] = useRecoilState(animeListTypeState)

    const handleClick = e => {
        setListType(e.currentTarget.value)
    }

    return (
        <div className="switch">
            <button className={listType === 'card' ? 'active' : ''} onClick={handleClick} value={'card'}>
                <BsViewList size={16}/>
            </button>
            <button className={listType === 'list' ? 'active' : ''} onClick={handleClick} value={'list'}>
                <BsList size={16}/>
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

export default ListTypeSwitcher