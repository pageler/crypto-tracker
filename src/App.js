import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CoinPage from "./pages/CoinPage";
import HomePage from "./pages/HomePage";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "./components/Alert";

function App() {
    const useStyles = makeStyles(() => ({
        App: {
            backgroundColor: "#14161a",
            color: "white",
            minHeight: "100vh",
        },
    }));

    // Classes object from mui makeStyles;
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.App}>
                {/*Header is common to both Route pages:*/}
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/coins/:id" element={<CoinPage />} />
                </Routes>
                <Alert />
            </div>
        </Router>
    );
}

export default App;
