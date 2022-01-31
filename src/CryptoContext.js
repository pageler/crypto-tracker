import { useEffect } from "react";
import { useContext, useState } from "react";
import { createContext } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");

    useEffect(() => {
        if (currency === "USD") setSymbol("$");
        if (currency === "GBP") setSymbol("£");
        else if (currency === "EUR") setSymbol("€");
    }, [currency]);

    return (
        <Crypto.Provider value={{ currency, setCurrency, symbol }}>
            {children}
        </Crypto.Provider>
    );
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};
