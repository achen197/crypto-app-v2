import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Main/Dashboard";
import News from "./Main/News";
import Ladder from "./Main/Ladder";
import CoinDetail from "./CoinDetail";

function Routes() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/ladder" component={Ladder} />
        <Route exact path="/news" component={News} />
        <Route exact path="/coin-detail" component={CoinDetail} />
      </Switch>
    </main>
  );
}

export default Routes;
