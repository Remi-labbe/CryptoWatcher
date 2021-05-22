import { Container, Form, Button } from 'react-bootstrap'

export default function Tile({ coin, index, deleteTile, changeCoin, price }) {

    return (
        <Container className="card">
            <Button onClick={ () => deleteTile(index) }>
                X
            </Button>
            <Form.Control as="select" value={coin} onChange={e => {
                changeCoin(index, e.target.value)
            }}>
                <option value="bitcoin">BTC - Bitcoin</option>
                <option value="ethereum">ETH - Ethereum</option>
                <option value="dogecoin">DOGE - Dogecoin</option>
                <option value="monero">XMR - Monero</option>
            </Form.Control>
            <div className="price">
                {price}
            </div>
        </Container>
    )
}
