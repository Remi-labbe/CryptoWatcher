import { useState,useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import axios from 'axios'

export default function Tile({ defaultCoin, index, deleteTile, setCoinInList, refCurrency }) {

    const [coin, setCoin] = useState(defaultCoin)
    const [price, setPrice] = useState("NA")

    function changeCoin() {
        setCoinInList(index, coin)
    }

    // function deleteSelf() {
    //     deleteTile(index)
    // }

    useEffect(() => {
        axios.get('http://localhost:3001/init', {
            params: {
                coin,
                refCurrency
            }
        }).then((res) => {
            setPrice(res.data.price)
        })
    }, [coin, refCurrency])

    return (
        <Container className="card">
            {/* TODO: delete Tile button */}
            {/* <Button onClick={deleteSelf}>
                X
            </Button> */}
            <Form.Control as="select" value={coin} onChange={e => {
                setCoin(e.target.value)
                changeCoin()
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
