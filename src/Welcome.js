import { Button, Container, Form } from 'react-bootstrap';
import './css/welcome.css'

export default function Welcome() {

    return (
        <Container className="welcome-form-container">
            <Form className='welcome-form' action="">
                <Form.Group>
                    <Form.Label>Choose your first Coin: </Form.Label>
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
                    <Form.Label>Choose your reference currency: </Form.Label>
                    <Form.Control as="select" name="currency">
                        <option value="usd">$ USD</option>
                        <option value="eur">€ EUR</option>
                        <option value="btc">₿ BTC</option>
                    </Form.Control>
                </Form.Group>
                <Button className="submit-button" as="input" type="submit" value="submit" />
            </Form>
        </Container>
    );
}
