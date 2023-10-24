// BitcoinPriceService.js
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

class BitcoinPriceService extends Component {
  constructor() {
    super();
    this.state = {
      bitcoinData: [],
    };
  }

  componentDidMount() {
    this.fetchBitcoinData();
  }

  fetchBitcoinData = () => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => response.json())
      .then((data) => {
        const bpiData = data.bpi;
        const bitcoinRecords = Object.values(bpiData);
        this.setState({ bitcoinData: bitcoinRecords });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.bitcoinData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>Currency: {item.code}</Text>
              <Text>Price: {item.rate}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default BitcoinPriceService;
