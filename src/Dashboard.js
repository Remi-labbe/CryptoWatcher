import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import TilesContainer from './TilesContainer';
import './css/dashboard.css';
import {ReactComponent as TrashIcon } from './icons/trash.svg';

// Set this variable to the number of day you want to remember the user choice.
const COOKIE_EXP_DAYS = 30;
const COOKIE_EXP_TIME = COOKIE_EXP_DAYS * 24 * 60 * 60;

export default function Dashboard({ coins, defaultCurrency }) {

    const [currency, setCurrency] = useState(defaultCurrency);
    const [refreshInterval, setRefreshInterval] = useState(10);

    function setCookie(name, value) {
        const expires = `expires=${COOKIE_EXP_TIME}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    }

    function reset() {
        deleteCookie('coins');
        deleteCookie('currency');
        window.location.reload();
    }

    useEffect(() => {
        setCookie('currency', currency);
    }, [currency])

    return (
        <Container>
            <Form>
                <Form.Control as="select" onChange={e => setCurrency(e.target.value)} value={currency}>
                    <option value="usd">$ USD</option>
                    <option value="eur">€ EUR</option>
                    <option value="btc">₿ BTC</option>
                </Form.Control>
                <Form.Control as="select" onChange={e => setRefreshInterval(e.target.value)} value={refreshInterval}>
                    <option value="5">5 seconds</option>
                    <option value="10">10 seconds</option>
                    <option value="30">30 seconds</option>
                </Form.Control>
            </Form>
            <div onClick={_ => reset()}>
                <TrashIcon />
            </div>
            <TilesContainer
                coins={coins}
                currency={currency}
                refreshInterval={refreshInterval}
                setCookie={setCookie}
            />
        </Container>
    );
}
