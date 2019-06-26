import React from "react";
import styles from "./Dashboard.module.scss";
import { AreaChart, Area } from "recharts";
import axios from "axios";

export class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      historical: [],
      items: [],
      isLoading: false
    };
  }

  getCoinInfo() {
    return axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=12&tsym=USD"
      )
      .then(itemRes => {
        const items = itemRes.data.Data;
        this.setState({ items, isLoading: true });
        let symbol = items.map(item => item.CoinInfo.Name);
        return Promise.all(
          symbol.map(symbolname => {
            return this.getCoinHistory(symbolname).then(res => ({
              symbol: symbolname,
              history: res
            }));
          })
        ).then(historicalRes => {
          let history = historicalRes.map(item => {
            return item;
          });
          let historical = history.reduce((acc, value) => {
            acc[value.symbol] = value.history.data.Data;
            return acc;
          }, {});
          this.setState({ historical, isLoading: true });
          console.log(historical);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getCoinHistory(symbolname) {
    return axios.get(
      "https://min-api.cryptocompare.com/data/histoday?tsym=USD&limit=15&aggregate=3&e=CCCAGG&",
      {
        params: {
          fsym: symbolname
        }
      }
    );
  }

  componentDidMount() {
    this.getCoinInfo();
    // this.timer = setInterval(() => this.getCoinInfo(), 10000);
  }

  render() {
    const { isLoading, items, historical } = this.state;
    if (!isLoading) {
      return <h1>Loading...</h1>;
    } else {
      return (
          <div className={styles.dashboardContainer}>
            {/* <h2>Watchlist</h2>
            <p>Updated Just Now</p> */}
            <div className={styles.watchlistContainer}>
              {items.map(item => (
                <div className={styles.watchlistCard} key={item.CoinInfo.Id}>
                  <div className={styles.coinInfo}>
                    <img
                      src={
                        "https://www.cryptocompare.com" + item.CoinInfo.ImageUrl
                      }
                      alt={item.CoinInfo.FullName}
                      className={styles.coinImg}
                    />
                    <div className={styles.coinName}>
                      <h3>{item.CoinInfo.FullName}</h3>
                      <p className={styles.Name}>{item.CoinInfo.Name}</p>
                    </div>
                  </div>
                  <div className={styles.price}>
                    <h3>${item.RAW.USD.PRICE.toFixed(2)}</h3>
                    <p
                      className={
                        item.RAW.USD.CHANGEPCTDAY > 0
                          ? styles.positive
                          : styles.negative
                      }
                    >
                      {item.RAW.USD.CHANGEPCTDAY.toFixed(2)}%
                    </p>
                  </div>
                  <div className={styles.graph}>
                    <AreaChart
                      width={270}
                      height={60}
                      data={historical[item.CoinInfo.Name]}
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
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.detailChart}>
              
            </div>
          </div>
      );
    }
  }
}

export default Dashboard;
