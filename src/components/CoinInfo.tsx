import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { makeStyles } from "tss-react/mui";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "./config/api";
import { SelectButton } from "./SelectButton";
import { chartDays } from "./config/data";

ChartJS.register(...registerables);

type CoinInfoProps = {
    coin: any;
};

export const CoinInfo = ({ coin }: CoinInfoProps) => {
    const [historicData, setHistoricData] = useState([]);
    const [flag, setFlag] = useState(false);
    const [days, setDays] = useState(1);

    const { currency } = CryptoState();

    useEffect(() => {
        const fetchHistoricData = async () => {
            try {
                const { data } = await axios.get(
                    HistoricalChart(coin.id, days, currency)
                );

                setFlag(true);
                setHistoricData(data.prices);
            } catch (error: any) {
                console.log(error);
            }
        };

        fetchHistoricData();
    }, [coin.id, days, currency]);

    console.log("Prices", historicData);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        },
    });

    const useStyles = makeStyles()((theme) => {
        return {
            container: {
                width: "75%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 25,
                padding: 40,
                [theme.breakpoints.down("md")]: {
                    width: "100%",
                    marginTop: 0,
                    padding: 20,
                    paddingTop: 0,
                },
            },
        };
    });

    const { classes } = useStyles();
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {!historicData || flag === false ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                ) : (
                    <>
                        <Line
                            data={{
                                labels: historicData.map((coin: any) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${
                                                  date.getHours() - 12
                                              }:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;

                                    return days === 1
                                        ? time
                                        : date.toLocaleDateString();
                                }),
                                datasets: [
                                    {
                                        data: historicData.map(
                                            (coin: any) => coin[1]
                                        ),
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: "#EEBC1D",
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />

                        {/* Buttons */}
                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            {chartDays.map((day: any) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => {
                                        setDays(day.value);
                                        setFlag(false);
                                    }}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </ThemeProvider>
    );
};
