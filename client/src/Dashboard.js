import { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import Tile from './Tile'
import './dashboard.css'

export default function Dashboard({ coins, remember, defaultCurrency }) {

    console.log(coins, remember, defaultCurrency)

    const [tiles, setTiles] = useState(['bitcoin', 'ethereum', 'dogecoin', 'monero'])
    const [currency, setCurrency] = useState(defaultCurrency)

    function setCoinAt(idx, coin) {
        let arr = tiles
        arr[idx] = coin
        setTiles(arr)
    }

    function deleteTileAt(idx) {
        //
    }

    // useEffect(() => {
    //     let arr = tiles.map(t => )
    // }, [currency])

    return (
        <Container>
            <Form>
                <Form.Control as="select" onChange={e => setCurrency(e.target.value)} value={currency}>
                    <option value="usd">$ USD</option>
                    <option value="eur">€ EUR</option>
                </Form.Control>
            </Form>
            <div className="card-container">
                {tiles.map((coin, idx) => (
                    <Tile key={idx} 
                        defaultCoin={coin} 
                        index={idx} 
                        deleteTile={deleteTileAt} 
                        setCoinInList={setCoinAt}
                        refCurrency={currency}
                    />
                ))}
            </div>
        </Container>
    )
}
