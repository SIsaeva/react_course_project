import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./components/main";
import NavBar from "./components/navBar";
import Login from "./components/login";
import UsersContent from "./components/usersContent";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/users/:userId?" component={UsersContent}></Route>
            </Switch>
        </div>
    );
}

export default App;
