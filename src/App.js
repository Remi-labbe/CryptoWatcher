import Dashboard from './Dashboard';

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

  const coins = getCookie('coins')?.split(',') ?? ['bitcoin'];
  const currency = getCookie('currency') ?? 'usd';

  return <Dashboard coins={coins} 
                    getCookie={getCookie}
                    defaultCurrency={currency}/> 
}

export default App;
