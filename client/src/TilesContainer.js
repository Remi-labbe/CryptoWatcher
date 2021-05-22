import { useState, useEffect, useRef } from 'react'
import Tile from './Tile'
import CoinGecko from 'coingecko-api'

const coinGeckoClient = new CoinGecko()

const UPDATE_INTERVAL = 10

export default function TilesContainer({ coins, currency }) {

    const [tiles, setTiles] = useState(['bitcoin', 'ethereum', 'dogecoin', 'monero'])
    const [prices, setPrices] = useState([])

    const interval = useRef()

    function setCoinAt(idx, coin) {
        let arr = [...tiles]
        arr[idx] = coin
        setTiles(arr)
    }

    function deleteTileAt(idx) {
        let arr = [...tiles]
        arr.splice(idx, 1)
        setTiles(arr)
    }

    useEffect(() => {
        let getPrices = async () => {
            return await coinGeckoClient.simple.price({
                ids: tiles,
                vs_currency: currency,
                include_24hr_change: true
            })
        }
        let updatePrices = () => {
            getPrices().then((CGPrices) => {
                let data = CGPrices.data
                console.log(data)
                let arr = []
                for (const key in data) {
                    arr[key] = data[key][currency]
                }
                setPrices(arr)
            })
        }
        clearInterval(interval.current)
        updatePrices()
        interval.current = setInterval(updatePrices, UPDATE_INTERVAL * 1000)
    }, [tiles, currency])

    return (
            <div className="card-container">
                {tiles.map((coin, idx) => (
                    <Tile key={idx}
                        coin={coin}
                        index={idx}
                        changeCoin={setCoinAt}
                        deleteTile={deleteTileAt}
                        price={prices[coin]}
                    />
                ))}
            </div>
    )
}