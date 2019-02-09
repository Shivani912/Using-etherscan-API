const loadWindow = () => 
{
    console.log("Load successful")

    // fetch data for ether price
    var ethusd = ''
    async function fetchEtherPrice()
    {
        let url = 'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=BQACZHUPRA9RYUBU7T4W32DF71RKJIEKIS'
        let response = await fetch(url)
        let priceData = await response.json()
        // console.log(priceData.result)
        ethusd = priceData.result.ethusd
        const ethbtc = priceData.result.ethbtc
        const priceString = `$${ethusd} @ ${ethbtc} BTC/ETH`
        // console.log(priceString)
        print(priceString,"etherVal")
    }
    fetchEtherPrice().catch( err =>
        {
            console.log("Error in fetchEtherPrice()")
        })
    
    // fetch total ether supply
    async function fetchTotalEtherSupply()
    {
        let url = 'https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=YourApiKeyToken'
        let response = await fetch(url)
        let etherData = await response.json()
        // console.log(etherData.result)
        const totalEther = parseInt(etherData.result) / 1000000000000000000
        // console.log(totalEther)
        const marketCap = ((totalEther * parseInt(ethusd)) / 1000000000).toFixed(3)
        // console.log(marketCap)
        const marketCapString = ` $${marketCap} BILLION`
        // console.log(marketCapString)
        print(marketCapString,"marketCap")
    }
    fetchTotalEtherSupply().catch ( err =>
        {
            console.log("Error in fetchTotalEtherSupply()")
        })


    // fetch last block number
    
    async function fetchLastBlockNum()
    {
        let url = 'https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken'
        let response = await fetch(url)
        let blockData = await response.json()
        let lastBlockNum = parseInt(blockData.result, 16)
        // console.log("last block number is: "+lastBlockNum)
        print(lastBlockNum,"lastBlock")

        fetchTotalNumOfTxns(blockData.result).catch(err =>
            {
                console.log("Error in fetchTotalNumOfTxns()")
            })
        fetchNetworkDifficulty(blockData.result).catch(err =>
            {
                console.log("Error in fetchNetworkDifficulty()")
            })
    }
    fetchLastBlockNum().catch(err =>
        {
            console.log("Error in fetchLastBlockNum()")
        })


    // fetch total number of transactions
    async function fetchTotalNumOfTxns(blockNum)
    {
        // console.log("this is block number in hex in another function "+blockNum)
        let url = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockTransactionCountByNumber&tag=${blockNum}&apikey=YourApiKeyToken`
        let response = await fetch(url)
        let txnData = await response.json()
        
        let totalNumOfTxns = parseInt(txnData.result,16)
        print(totalNumOfTxns,"txnCount")
    }

    // fetch network difficulty
    async function fetchNetworkDifficulty(blockNum)
    {
        let url = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNum}&boolean=true&apikey=YourApiKeyToken`
        let response = await fetch(url)
        let data = await response.json()
        let difficulty = parseInt(data.result.difficulty,16)
        let difficultyString = (difficulty / 1000000000000).toFixed(2)+ " TH"
        print(difficultyString,"networkDifficulty")

        // Find hash rate
        let hashRate = (difficulty/15000000000).toFixed(2)
        console.log(hashRate)
        hashRateString = hashRate+" GH/s"
        print(hashRateString,"hashRate")
    }

    // // fetch account balance
    // async function 
   
    // function to print data to html
    const print = (printString,elementId) =>
    {
        const element = document.getElementById(elementId)
        element.innerHTML = printString
    }

    // Toggle Button
    let element = document.getElementById("toggleBtn")
    element.addEventListener("click",function(e)
    {
        var setInt = setInterval(refresh,15000)
        function refresh()
        {
            if(element.checked == false)
            {
                clearInterval(setInt)
                console.log("unchecked !")    
            }
            
            else if(element.checked == true)
            {
                console.log("checked !")
                fetchEtherPrice()
                fetchTotalEtherSupply()
                fetchLastBlockNum()
            }
        }
    })
}




window.addEventListener('load', loadWindow())