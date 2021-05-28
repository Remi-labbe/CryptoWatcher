import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import TilesContainer from './TilesContainer';
import './css/dashboard.css';

export default function Dashboard({ coins, remember, defaultCurrency }) {

    const [currency, setCurrency] = useState(defaultCurrency);
    const [refreshInterval, setRefreshInterval] = useState(10);

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
            <TilesContainer
                coins={coins}
                currency={currency}
                refreshInterval={refreshInterval}
            />
        </Container>
    );
}
