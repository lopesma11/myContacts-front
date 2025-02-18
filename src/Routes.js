import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Home from "../src/pages/Home";
import NewContact from "../src/pages/Home";
import EditContact from "../src/pages/Home";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/new" component={NewContact} />
            <Route path="/edit/:id" component={EditContact} />
        </Switch>
    );
}
