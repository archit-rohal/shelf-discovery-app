import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {makeServer} from "./server";
import {BrowserRouter} from "react-router-dom";
import {LoginProvider} from "./contexts/LoginProvider";
import {AuthProvider} from "./contexts/AuthProvider";
import {SignupProvider} from "./contexts/SignupProvider";
import {DataProvider} from "./contexts/DataProvider";
import {FiltersProvider} from "./contexts/FiltersProvider";
import {UserProfileProvider} from "./contexts/UserProfileProvider";
import {AddressProvider} from "./contexts/AddressProvider";

// Call make Server
makeServer();

const root = document.getElementById("root");
const app = (
    <BrowserRouter>
        <LoginProvider>
            <SignupProvider>
                <AuthProvider>
                    <DataProvider>
                        <FiltersProvider>
                            <UserProfileProvider>
                                <AddressProvider>
                                    <App/>
                                </AddressProvider>
                            </UserProfileProvider>
                        </FiltersProvider>
                    </DataProvider>
                </AuthProvider>
            </SignupProvider>
        </LoginProvider>
    </BrowserRouter>
);

ReactDOM.createRoot(root).render(app);

/*
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {makeServer} from "./server";
import {BrowserRouter} from "react-router-dom";
import {LoginProvider} from "./contexts/LoginProvider";
import {AuthProvider} from "./contexts/AuthProvider";
import {SignupProvider} from "./contexts/SignupProvider";
import {DataProvider} from "./contexts/DataProvider";
import {FiltersProvider} from "./contexts/FiltersProvider";

// Call make Server
makeServer();

ReactDOM.render(
        <BrowserRouter>
            <LoginProvider>
                <SignupProvider>
                    <AuthProvider>
                        <DataProvider>
                            <FiltersProvider>
                                <App/>
                            </FiltersProvider>
                        </DataProvider>
                    </AuthProvider>
                </SignupProvider>
            </LoginProvider>
        </BrowserRouter>,
    document.getElementById("root")
);
*/