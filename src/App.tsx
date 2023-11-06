import "./App.css";
import { makeStyles } from "tss-react/mui";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { CoinPage } from "./pages/CoinPage";
import { MyAlert } from "./components/MyAlert";

function App() {
    const useStyles = makeStyles()(() => {
        return {
            App: {
                backgroundColor: "#14161a",
                color: "white",
                minHeight: "100vh",
            },
        };
    });

    const { classes } = useStyles();

    return (
        <>
            <div className={classes.App}>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/coins/:id" element={<CoinPage />} />
                </Routes>
            </div>

            <MyAlert />
        </>
    );
}

export default App;
