import './dropdown.css';

import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

import { ReactComponent as UpChevron } from './icons/up-chevron.svg';
import { ReactComponent as DownChevron } from './icons/down-chevron.svg';

function DropdownMenu({ tileIndex, changeCoin, items = [] }) {

    const [dropItems, setDropItems] = useState(items);
    const [search, setSearch] = useState("")

    useEffect(() => {
        let results = items.filter(item => {
            if (item.shortName.indexOf(search) !== -1) return true;
            if (item.fullName.indexOf(search) !== -1) return true;
            return false;
        })
        setDropItems(results);
    }, [search, items]);

    function DropdownItem({ tileIndex, children, coin, changeCoin }) {
        return (
            <button className="dropdown-item" onClick={_ => changeCoin(tileIndex, coin)}>
                {children}
            </button>
        );
    }

    return (
        <div className="dropdown">
            <Form.Control type="search" onChange={e => setSearch(e.target.value)}
                    placeholder="Search ..."/>
            {dropItems.map(item => (
                <DropdownItem tileIndex={tileIndex} key={item.fullName} coin={item.fullName} changeCoin={changeCoin}>
                    {`${item.shortName.toUpperCase()} - ${item.fullName.replace(/^\w/, c => c.toUpperCase())}`}
                </DropdownItem>
            ))}
        </div>
    );
}

export default function Dropdown({ coin = "NA", icon, changeCoin, index, items }) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [coin])

    return (
        <div className="dropdown-button-container">
            <button
                className="dropdown-button"
                onClick={_ => setOpen(!open)}>
                <img src={icon} alt="coin icon" style={{
                    width: "2rem",
                    height: "2rem"
                }} />
                {coin.replace(/^\w/, c => c.toUpperCase())}
                {open ? <UpChevron /> : <DownChevron />}
            </button>

            {open && 
                <DropdownMenu tileIndex={index} 
                        changeCoin={changeCoin}
                        items={items} />
            }
        </div>
    );
}
