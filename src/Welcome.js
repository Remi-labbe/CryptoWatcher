import { Button, Container, Form } from 'react-bootstrap';

const REDIRECT_URL = 'http://localhost:3000';

export default function Welcome() {

    return (
        <Container>
            <Form action={REDIRECT_URL}>
                <Form.Group>
                    <Form.Label>Choose your first Coin</Form.Label>
                    <Form.Control as="select" name="choice">
                        {/* default coin user can follow
                        Hardcoded as we propose the most know ones. */}
                        <option value="bitcoin">BTC - Bitcoin</option>
                        <option value="ethereum">ETH - Ethereum</option>
                        <option value="dogecoin">DOGE - Dogecoin</option>
                        <option value="monero">XMR - Monero</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Choose your reference currency</Form.Label>
                    <Form.Control as="select" name="currency">
                        <option value="usd">$ USD</option>
                        <option value="eur">€ EUR</option>
                        <option value="btc">₿ BTC</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
