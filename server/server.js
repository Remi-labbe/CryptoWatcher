const cors = require('cors')
const express = require('express')
const CoinGecko = require('coingecko-api')

const app = express()
const CoinGeckoClient = new CoinGecko()

app.use(cors())
app.use(express.json())

let simplePrice = async (coin, refCurrency) => {
    return await CoinGeckoClient.simple.price({
        ids: coin,
        vs_currencies: refCurrency
    })
}

app.get('/init', async (req, res) => {
    const coin = req.query.coin
    const referenceCurrency = req.query.refCurrency
    const CGres = await simplePrice(coin, referenceCurrency)
    const price = CGres.data[coin][referenceCurrency]
    res.json({
        price
    })
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`app start at localhost:${port}`))