import { Button, Container, Form } from 'react-bootstrap'

const REDIRECT_URL = 'http://localhost:3000'

export default function Welcome() {

    return (
        <Container>
            <Form action={REDIRECT_URL}>
                <Form.Group>
                    <Form.Label>Choose your first Coin</Form.Label>
                    <Form.Control as="select" name="choices">
                        <option value="bitcoin">BTC - Bitcoin</option>
                        <option value="ethereum">ETH - Ethereum</option>
                        <option value="dogecoin">DOGE - Dogecoin</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Choose your reference currency</Form.Label>
                    <Form.Control as="select" name="currency">
                        <option value="usd">$ USD</option>
                        <option value="eur">€ EUR</option>
                    </Form.Control>
                </Form.Group>
                {/* Left to implement - remember the choices with browser storage */}
                <Form.Check name="remember" type="checkbox" label="Remember my choices" />
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}
