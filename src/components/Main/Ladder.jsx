import React from "react";
import styles from "./Ladder.module.scss";
import axios from "axios";
import { AreaChart, Area } from "recharts";

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

export class Ladder extends React.Component {
  constructor() {
    super();
    this.state = {
      historical: [],
      items: [],
      isLoading: false
    };
  }

  componentDidMount() {
    // axios
    //   .all([
    //     axios.get(
    //       "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=12&aggregate=3&e=CCCAGG"
    //     ),
    //     axios.get(
    //       "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=50&tsym=USD"
    //     )
    //   ])
    //   .then(
    //     axios.spread((historicalRes, itemRes) => {
    //       const historical = historicalRes.data.Data;
    //       const items = itemRes.data.Data;
    //       this.setState({ historical, items, isLoading: true });
    //       console.log(historical);
    //       console.log(items);
    //     })
    //   )
    //   .catch(err => {
    //     console.log(err);
    //   });
    axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=50&tsym=USD"
      )
      .then(itemRes => {
        const items = itemRes.data.Data;
        this.setState({ items, isLoading: true, });
        let symbol = items.map(item => item.CoinInfo.Name);
        return axios.get(
          'https://min-api.cryptocompare.com/data/histoday?tsym=USD&limit=12&aggregate=3&e=CCCAGG&', {
            params: {
              fsym: symbol[0]
            }
          }
        );
      })
      .then(historicalRes => {
        const historical = historicalRes.data.Data;
        this.setState({ historical, isLoading: true });
        console.log(historical);
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
              <tr>
                <th>Coin</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>Volume 24HR</th>
                <th>Change 24HR</th>
                <th>Price Graph</th>
              </tr>
              {items.map(item => (
                <tr className={styles.newsCard} key={item.CoinInfo.Id}>
                  <td className={styles.coinInfo}>
                    <img
                      src={
                        "https://www.cryptocompare.com" + item.CoinInfo.ImageUrl
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
            </table>
          </div>
        </div>
      );
    }
  }
}

export default Ladder;
