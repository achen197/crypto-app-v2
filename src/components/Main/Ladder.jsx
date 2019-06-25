import React from "react";
import styles from "./Ladder.module.scss";
import axios from "axios";
import { AreaChart, Area } from "recharts";

export class Ladder extends React.Component {
  constructor() {
    super();
    this.state = {
      historical: [],
      items: [],
      combinedItems: [],
      coinSymbols:[],
      isLoading: false
    };
  }

  renderCoinInfo() {
    return axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=50&tsym=USD"
      )
      .then(res => {
        const items = res.data.Data;
        this.setState({ items });
      });
  }

  renderCoinSymbol() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=50&tsym=USD"
      )
      .then(itemRes => {
        const item = itemRes.data.Data;
        const coinSymbols = item.map(sym => sym.CoinInfo.Name);
        this.setState({coinSymbols})
        console.log(coinSymbols);
        // const symbol = item.map(sym => sym.)
      })
  }

  renderCoinHistory(symbolname) {
    return axios.get(
      "https://min-api.cryptocompare.com/data/histoday?tsym=USD&limit=12&aggregate=3&e=CCCAGG&",
      {
        params: {
          fsym: symbolname
        }
      }
    );
  }

  componentDidMount() {
    console.log(this.renderCoinSymbol());
    // let combinedItems = combineLatest(this.renderCoinInfo(), this.renderCoinHistory("BTC")
    // .map(([first, second]) => {
    //     let keys = Object.keys(first);
    //     let combined = [];
    //     for (let key in keys) {
    //       let data = first[keys[keys]];
    //       let history = second[keys[key]];
    //       combined.push({CoinInfo: data, CoinHistory: history})
    //     }
    //     // const combinedItems = combined;
    //     // this.setState({combinedItems});
    //   }));
    //   // console.log(combinedItems);
    //   // return combinedItems;
    axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=50&tsym=USD"
      )
      .then(itemRes => {
        const items = itemRes.data.Data;
        this.setState({ items, isLoading: true });
        // let symbol = items.map(item => item.CoinInfo.Name);
        // return Promise.all(
        //   symbol.map(symbolname => {
        //     return this.renderCoinHistory(symbolname).then(res => ({
        //       symbol: symbolname,
        //       history: res
        //     }));
        //   })
        // )
        // .then(historicalRes => {
        //   let historical = historicalRes.map(item => {
        //     return item;
        //   });
        //   this.setState({ historical, isLoading: true });
        //   console.log(items);
        //   // console.log(historical);
        //   // return items.map(item => console.log({...item.CoinInfo, CoinHistory: historical}));
        // });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { isLoading, items, historical } = this.state;
    if (!isLoading) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className={styles.LadderContainer}>
          <div className={styles.coinsContainer}>
            <p>Updated Just Now</p>
            <table>
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th>Volume 24HR</th>
                  <th>Change 24HR</th>
                  <th>Price Graph</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr className={styles.newsCard} key={item.CoinInfo.Id}>
                    <td className={styles.coinInfo}>
                      <img
                        src={
                          "https://www.cryptocompare.com" +
                          item.CoinInfo.ImageUrl
                        }
                        alt={item.CoinInfo.FullName}
                        className={styles.coinImg}
                      />
                      <span className={styles.Name}>
                        {item.CoinInfo.FullName}
                      </span>
                    </td>
                    <td>${item.RAW.USD.PRICE.toFixed(2)}</td>
                    <td>${item.RAW.USD.MKTCAP.toFixed(2)}</td>
                    <td>${item.RAW.USD.VOLUME24HOUR.toFixed(2)}</td>
                    <td
                      className={
                        item.RAW.USD.CHANGEPCTDAY > 0
                          ? styles.positive
                          : styles.negative
                      }
                    >
                      {item.RAW.USD.CHANGEPCTDAY.toFixed(2)}%
                    </td>
                    <td>
                      <AreaChart
                        width={200}
                        height={45}
                        data={historical}
                        margin={{
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0
                        }}
                      >
                        <Area
                          type="monotone"
                          dataKey="close"
                          stroke="#8884d8"
                          fill="#8884d8"
                        />
                      </AreaChart>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default Ladder;
