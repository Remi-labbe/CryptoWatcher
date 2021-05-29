import { useState, useEffect, useRef } from 'react';
import Tile from './Tile';
import CoinGecko from 'coingecko-api';
import { ReactComponent as PlusIcon } from './icons/plus-lg.svg';

const coinGeckoClient = new CoinGecko();

const DEFAULT_UPDATE_INTERVAL = 10;

export default function TilesContainer({ coins, currency, refreshInterval, setCookie }) {

    const [availableCoins, setAvailableCoins] = useState([])
    const [tiles, setTiles] = useState(coins);
    const [coinDatas, setCoinDatas] = useState([]);

    const requestAnimationRef = useRef();
    const timeoutRef = useRef();

    function addTile() {
        let arr = [...tiles];
        arr.push('bitcoin');
        setTiles(arr);
    }

    function setCoinAt(idx, coin) {
        let arr = [...tiles];
        arr[idx] = coin;
        setTiles(arr);
    }

    function deleteTileAt(idx) {
        let arr = [...tiles];
        arr.splice(idx, 1);
        setTiles(arr);
    }


    useEffect(() => {
        setCookie('coins', tiles.join());
    }, [tiles, setCookie]);

    useEffect(() => {
        let getData = async () => {
            return await coinGeckoClient.coins.markets({
                vs_currency: currency,
                page: 1,
                per_page: 100
            });
        }
        getData().then(CGList => {
            let data = CGList.data;
            let arr = [];
            for (const field of data) {
                const shortName = field.symbol;
                const fullName = field.id;
                const iconUrl = field.image;
                arr.push({
                    fullName,
                    shortName,
                    iconUrl
                });
            }
            setAvailableCoins(arr);
        })
    }, [currency])

    useEffect(() => {
        cancelAnimationFrame(requestAnimationRef.current);
        clearTimeout(timeoutRef.current);
        let getPrices = async () => {
            return await coinGeckoClient.coins.markets({
                ids: tiles,
                vs_currency: currency
            });
        }
        let updatePrices = () => {
            getPrices().then((CGPrices) => {
                let data = CGPrices.data;
                let arr = [];
                for (const field of data) {
                    const name = field.id;
                    const coinDatas = {
                        price: field.current_price,
                        icon: field.image,
                        price_change_24h: field.price_change_percentage_24h
                    };
                    arr[name] = coinDatas;
                }
                setCoinDatas(arr);
            });
        }
        let refresh = (timestamp) => {
            updatePrices();
            timeoutRef.current = setTimeout(() => {
                requestAnimationRef.current = requestAnimationFrame(refresh);
            }, (refreshInterval ?? DEFAULT_UPDATE_INTERVAL) * 1000);
        }
        requestAnimationFrame(refresh);
    }, [tiles, currency, refreshInterval]);

    return (
        <div className="tile-container">
            {tiles.map((coin, idx) => (
                <Tile key={idx}
                    availableCoins={availableCoins}
                    currency={currency}
                    coin={coin}
                    index={idx}
                    changeCoin={setCoinAt}
                    deleteTile={deleteTileAt}
                    data={coinDatas[coin]}
                />
            ))}
            <div className="tile new-tile-button" onClick={() => addTile()}>
                <PlusIcon />
            </div>
        </div>
    );
}