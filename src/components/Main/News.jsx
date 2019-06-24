import React from "react";
import axios from "axios";
import styles from "./News.module.scss";

export default class News extends React.Component {
  constructor() {
    super();
    this.state = {
      newsData: [],
      isLoading: false
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/v2/news/?feeds=cryptocompare,cointelegraph,coindes"
      )
      .then(res => {
        const newsData = res.data.Data;
        this.setState({ newsData });
      });
  }

  renderDate(d) {
    let newDate = new Date(d * 1000);
    return newDate.toString().substring(3,15);
  }

  render() {
    return (
      <div className={styles.newsContainer}>
        <h2>Headlines</h2>
        {this.state.newsData.slice(0, 10).map(item => (
          <div className={styles.headlineCard} key={item.id}>
            <img src={item.imageurl} alt={item.title} />
            <div className={styles.content}>
              <h4 className={styles.category}>{item.categories}</h4>
              <p className={styles.date}>{this.renderDate(item.published_on)}</p>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
              <p className={styles.author}>
                <span>
                  <img src={item.source_info.img} alt={item.source_info.name} />
                </span>
                {item.source_info.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
