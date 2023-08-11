import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./layouts/main";
import NavBar from "./components/UI/navBar";
import Login from "./layouts/login";
import UsersContent from "./layouts/usersContent";
import { ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={UsersContent}
                    ></ProtectedRoute>
                    <Route path="/login/:type?" component={Login}></Route>
                    <Route path="/logout" component={LogOut}></Route>
                    <Route exact path="/" component={Main}></Route>
                    <Redirect to="/" />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
