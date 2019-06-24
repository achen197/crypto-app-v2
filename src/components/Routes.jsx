import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Main/Dashboard";
import News from "./Main/News";
import Ladder from "./Main/Ladder";

function Routes() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/ladder" component={Ladder} />
        <Route exact path="/news" component={News} />
      </Switch>
    </main>
  );
}

export default Routes;
