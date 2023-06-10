import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./layouts/main";
import NavBar from "./components/UI/navBar";
import Login from "./layouts/login";
import UsersContent from "./layouts/usersContent";
function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main}></Route>
                <Route path="/login/:type?" component={Login}></Route>
                <Route
                    path="/users/:userId?/:edit?"
                    component={UsersContent}
                ></Route>
            </Switch>
        </div>
    );
}

export default App;
