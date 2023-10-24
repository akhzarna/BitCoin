const getData = async () => {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    const data = await response.json()
    return data;
}
export default getData;