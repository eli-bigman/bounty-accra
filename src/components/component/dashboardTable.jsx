import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";
import Select from 'react-select';

export default function Dashboard() {
  const [cryptoPrices, setCryptoPrices] = useState([
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 0,
      selectedCoin: "BTC",
      amount: 1,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 0,
      selectedCoin: "BTC",
      amount: 1,
    },
   
  ]);
  const [coinOptions, setCoinOptions] = useState([]);
  const [error, setError] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchCryptoPrices = async () => {
    try {
      console.log("Fetching crypto prices...");
      const web3 = new Web3(window.ethereum);
      web3.registerPlugin(new ChainlinkPlugin());

      const prices = await Promise.all([ 
        web3.chainlink.getPrice(MainnetPriceFeeds.BtcUsd), 
        web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd),
      ]);

      console.log("Prices fetched:", prices);

      setCryptoPrices(prevPrices => prevPrices.map((coin, index) => {
        const priceData = prices[index];
        const price = priceData ? parseFloat(priceData.answer) / 1e8 : coin.price; 
        return {
          ...coin,
          price: price,
        };
      }));
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
      setError("Failed to fetch cryptocurrency prices. Please try again later.");
    } finally {
      setButtonClicked(false);
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
  }, []);

  useEffect(() => {
    const extractCoinOptions = () => {
      const options = Object.keys(MainnetPriceFeeds).map(key => ({
        value: key,
        label: key.replace(/([A-Z])/g, ' $1').trim()
      }));
      setCoinOptions(options);
    };

    extractCoinOptions();
  }, []);

  const handleCoinChange = (coin, index) => {
    setCryptoPrices(prevPrices => prevPrices.map((item, i) => (
      i === index ? { ...item, selectedCoin: coin.value } : item
    )));
  };

  const handleAmountChange = (e, index) => {
    const value = e.target.value;
    setCryptoPrices(prevPrices => prevPrices.map((item, i) => (
      i === index ? { ...item, amount: value } : item
    )));
  };

  const handleConvert = (coin) => {
    console.log(`Converting ${coin.amount} ${coin.symbol} to ${coin.selectedCoin}`);
  };

  const handleUpdatePrices = () => {
    setButtonClicked(true);
    fetchCryptoPrices();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Cryptocurrency Dashboard</h1>
        <button onClick={handleUpdatePrices} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Update Prices
        </button>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-4 py-3 text-left">Coin Name</th>
              <th className="px-4 py-3 text-right">Price (USD)</th>
              <th className="px-4 py-3 text-left">Convert Coin</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-right">Converted Price</th>
              <th className="px-4 py-3 text-right">Convert</th>
            </tr>
          </thead>
          <tbody>
            {cryptoPrices.map((coin, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} text-black`}>
                <td className="px-4 py-3 text-left font-medium">
                  {coin.name} ({coin.symbol})
                </td>
                <td className="px-4 py-3 text-right">${coin.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-left">
                  <Select
                    value={coinOptions.find(option => option.value === coin.selectedCoin)}
                    onChange={(selectedOption) => handleCoinChange(selectedOption, index)}
                    options={coinOptions}
                    className="w-32"
                    menuPortalTarget={document.body}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: "0.375rem",
                        borderColor: "#d1d5db",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#9ca3af",
                        },
                      }),
                      menu: (base) => ({
                        ...base,
                        borderRadius: "0.375rem",
                        overflow: "hidden",
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? "#4b5563" : "#ffffff",
                        color: state.isSelected ? "#ffffff" : "#000000",
                        "&:hover": {
                          backgroundColor: "#e5e7eb",
                        },
                      }),
                      menuPortal: base => ({ ...base, zIndex: 9999 })
                    }}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <input
                    type="number"
                    value={coin.amount}
                    onChange={(e) => handleAmountChange(e, index)}
                    className="w-24 text-right border rounded-md px-2 py-1" />
                </td>
                <td className="px-4 py-3 text-right">
                  ${(coin.price * coin.amount).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleConvert(coin)} className="px-4 py-2 bg-black text-white rounded-md">
                    Convert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}