import React from "react";
import styles from "./Dashboard.module.scss";
import { LineChart, Line } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={styles.dashboardContainer}>
          <div className={styles.coinsContainer}>
            <h2>Watchlist</h2>
          </div>
          <div className={styles.newsContainer} />
          <LineChart width={300} height={100} data={data}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </div>
      </div>
    );
  }
}

export default Dashboard;
