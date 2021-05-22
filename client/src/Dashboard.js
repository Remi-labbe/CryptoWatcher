import { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import TilesContainer from './TilesContainer'
import './dashboard.css'

export default function Dashboard({ coins, remember, defaultCurrency }) {

    // console.log('defaults', coins, remember, defaultCurrency)

    const [currency, setCurrency] = useState(defaultCurrency)

    return (
        <Container>
            <Form>
                <Form.Control as="select" onChange={e => setCurrency(e.target.value)} value={currency}>
                    <option value="usd">$ USD</option>
                    <option value="eur">€ EUR</option>
                </Form.Control>
            </Form>
            <TilesContainer
                coins={coins}
                currency={currency}
            />
        </Container>
    )
}
