import { createContext, useContext, useEffect, useState } from "react";

type CryptoContextProps = {
    children?: JSX.Element | JSX.Element[];
    currency?: string;
    setCurrency?: React.Dispatch<React.SetStateAction<string>>;
    symbol?: string;
};

const Crypto = createContext<CryptoContextProps>({});

export const CryptoContext = ({ children }: CryptoContextProps) => {
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");

    useEffect(() => {
        if (currency === "USD") {
            setSymbol("$");
        } else if (currency === "GBP") {
            setSymbol("£"); // (ALT + 0163)
        } else if (currency === "EUR") {
            setSymbol("€"); // (ALT + 0128)
        }
    }, [currency]);

    return (
        <Crypto.Provider value={{ currency, setCurrency, symbol }}>
            {children}
        </Crypto.Provider>
    );
};

// useContext Hook:
export function CryptoState() {
    return useContext(Crypto);
}
// wrap <App /> with <CryptoContext> component in 'src\index.tsx'
