import {FaSearch, FaShoppingBag, FaRedoAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import BagCountdown from './BagCountdown'

function ControlBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const search = (e) => {
        e.preventDefault();
        alert('search entered');
    }

    return (
        <header className="header control-bar" onSubmit={search}>        
            <ul>
                <li>
                    <form style={{display: 'flex'}} className="search">
                        <FaSearch />
                        <input type="text" placeholder="Search" />
                    </form>
                </li>
                <li>
                    <div className="bg-light-gray d-flex refresh">
                        <FaRedoAlt />
                        <small><strong>Last Refreshed: 10/02/2022 - 20:15:00</strong></small>
                    </div>
                </li>
                <li>
                    <BagCountdown />
                </li>
            </ul>
        </header>
    )
}

export default ControlBar