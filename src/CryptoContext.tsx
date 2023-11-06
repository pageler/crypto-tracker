import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "./components/config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

type CryptoContextProps = {
    children?: JSX.Element | JSX.Element[];
    currency?: string;
    setCurrency?: React.Dispatch<React.SetStateAction<string>>;
    symbol?: string;
    loading?: boolean;
    coins?: any;
    alert?: any;
    setAlert?: any;
    fetchCoinList?: Function;
    user?: any;
};

const Crypto = createContext<CryptoContextProps>({});

export const CryptoContext = ({ children }: CryptoContextProps) => {
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState([]);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (currency === "USD") {
            setSymbol("$");
        } else if (currency === "GBP") {
            setSymbol("£"); // (ALT + 0163)
        } else if (currency === "EUR") {
            setSymbol("€"); // (ALT + 0128)
        }
    }, [currency]);

    useEffect(() => {
        const fetchCoinList = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(CoinList(currency));

                console.log("CoinsList", data);
                setCoins(data);
                setLoading(false);
            } catch (error: any) {
                console.log(error);
            }
        };

        fetchCoinList();
    }, [currency]);

    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    return (
        <Crypto.Provider
            value={{
                currency,
                setCurrency,
                symbol,
                loading,
                coins,
                alert,
                setAlert,
                user,
            }}
        >
            {children}
        </Crypto.Provider>
    );
};

// useContext Hook:
export function CryptoState() {
    return useContext(Crypto);
}
// wrap <App /> with <CryptoContext> component in 'src\index.tsx'
