import Dashboard from './Dashboard';
import Welcome from './Welcome';

const coinUrlString = new URLSearchParams(window.location.search).get('choice');
const currencyUrlString = new URLSearchParams(window.location.search).get('currency');
window.history.pushState({}, "", '/');

function App() {

  function getCookie(name) {
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookies.split(";");
    for (let i = 0; i < cookiesArray.length; i++) {
      const cookiePair = cookiesArray[i].split('=');
      if (cookiePair[0].trim() === name) {
        return cookiePair[1];
      }
    }
    return null;
  }

  const coins = coinUrlString ? [coinUrlString] : null ?? getCookie('coins')?.split(',');
  const currency = currencyUrlString ?? getCookie('currency') ?? 'usd';

  return coins ? <Dashboard coins={coins} 
                            getCookie={getCookie}
                            defaultCurrency={currency}/> 
                        : <Welcome />;
}

export default App;
