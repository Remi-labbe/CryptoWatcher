import { Container, Button } from 'react-bootstrap';
import { ReactComponent as ExitCross } from './icons/x-lg.svg'
import Dropdown from './Dropdown';

export default function Tile({ availableCoins, currency, coin, index, deleteTile, changeCoin, data = {
    price: "---",
    icon: "",
    price_change_24h: "---"
} }) {

    function formatPrice(price) {
        if (currency === 'usd') return `$${price}`;
        if (currency === 'eur') return `${price}€`;
        return `${price}₿`
    }

    function formatPriceChange(changePercentage) {
        if (changePercentage === '---') return changePercentage;
        return `${Number(changePercentage).toFixed(2)}%`;
    }

    return (
        <Container className="card">
            <div className="exit-button" onClick={() => deleteTile(index)}>
                <ExitCross />
            </div>
            <Dropdown coin={coin}
                icon={data.icon}
                changeCoin={changeCoin}
                index={index}
                items={availableCoins}
            />
            <span className="price">
                {formatPrice(data.price)}
            </span>
            <span className={data.price_change_24h >= 0
                ? 'posChange'
                : 'negChange'}>
                {formatPriceChange(data.price_change_24h)}
            </span>
        </Container>
    );
}
