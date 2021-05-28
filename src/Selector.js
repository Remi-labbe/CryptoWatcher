import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';

export default function Selector({
    changeCoin,
    currentCoin = 'bitcoin',
    icon = 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579' }) {

    const coins = ['bitcoin', 'ethereum', 'dogecoin', 'monero'];

    const [active, setActive] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {

    }, [active])

    useEffect(() => {
        
    }, [search])

    function createOption(coin) {
        return (
            <Container className="option">
                <Form.Check
                    defaultChecked={currentCoin === coin}
                    type="radio"
                    id={coin}
                    label={coin}
                    name="coin"
                    onClick={_ => changeCoin(coin)}
                />
            </Container>
        );
    }

    return (
        <Form className="select-box">
            <Form.Group className="options-container">
                {coins.map(coin => createOption(coin))}
            </Form.Group>
            <Container className="selected" onClick={() => setActive(!active)}>
                <img src={icon} alt="coin icon" />
                {currentCoin}
            </Container>
            <Container className="search-box">
                <Form.Control type="text"
                    placeholder="Search ..."
                    onChange={e => setSearch(e.target.value)} />
            </Container>
        </Form>
    );
}
