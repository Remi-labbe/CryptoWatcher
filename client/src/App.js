import Dashboard from './Dashboard'
import Welcome from './Welcome'

const coinsUrlString = new URLSearchParams(window.location.search).get('choices');
const currency = new URLSearchParams(window.location.search).get('currency');
const isSetRemember = new URLSearchParams(window.location.search).get('remember');
window.history.pushState({}, "", '/')

function App() {
  return coinsUrlString ? <Dashboard coins={coinsUrlString} 
                                     remember={isSetRemember} 
                                     defaultCurrency={currency}/> 
                        : <Welcome />
}

export default App;
