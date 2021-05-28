import './css/dropdown.css';

import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';

function DropdownMenu({ tileIndex, changeCoin, items }) {

    const [dropItems, setDropItems] = useState(items);
    const [search, setSearch] = useState("");

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
            // menu-item
            <div className="dropdown-item" onClick={_ => changeCoin(tileIndex, coin)}>
                {children}
            </div>
        );
    }

    return (
        <div className="dropdown">
            <Form className="dropdown-search">
                <Form.Control type="search" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search ..." />
            </Form>
            <Container className="dropdown-items-container">
                <Container className="dropdown-content">
                    {dropItems.map(item => (
                        <DropdownItem tileIndex={tileIndex} key={item.fullName} coin={item.fullName} changeCoin={changeCoin}>
                            {`${item.shortName.toUpperCase()} ${item.fullName.replace(/^\w/, c => c.toUpperCase())}`}
                        </DropdownItem>
                    ))}
                </Container>
            </Container>
        </div>
    );
}

export default function Dropdown({ coin = "NA", icon, changeCoin, index, items = [] }) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [coin])

    return (
        <div className="dropdown-container">

            <div className="dropdown-button"
                onClick={_ => setOpen(!open)}>
                <img src={icon} alt={`[${coin} icon]`} style={{
                    width: "1.5rem",
                    height: "1.5rem"
                }} />
                {coin.replace(/^\w/, c => c.toUpperCase())}
            </div>

            {open &&
                <DropdownMenu tileIndex={index}
                    changeCoin={changeCoin}
                    items={items} />
            }

        </div>
    );
}
