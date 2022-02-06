import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";
import { CoinList } from "./config/api";
import { auth, db } from "./firebase";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
    });
    const [watchlist, setWatchlist] = useState([]);
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user?.uid);

            var unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
                    console.log(coin.data().coins);
                    setWatchlist(coin.data().coins);
                } else {
                    console.log("No Items in Watchlist");
                }
            });

            return () => {
                unsubscribe();
            };
        }
    }, [user]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser(null);

            console.log("====================================");
            console.log("DB {user.id} rules: ", user);
            console.log("====================================");
        });
    }, []);

    useEffect(() => {
        if (currency === "USD") setSymbol("$");
        if (currency === "GBP") setSymbol("£");
        else if (currency === "EUR") setSymbol("€");

        const fetchCoins = async () => {
            setLoading(true);
            const { data } = await axios.get(CoinList(currency));

            setCoins(data);
            setLoading(false);
        };

        fetchCoins();
    }, [currency]);

    return (
        <Crypto.Provider
            value={{
                currency,
                setCurrency,
                symbol,
                alert,
                setAlert,
                user,
                watchlist,
                coins,
                loading,
            }}
        >
            {children}
        </Crypto.Provider>
    );
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};
