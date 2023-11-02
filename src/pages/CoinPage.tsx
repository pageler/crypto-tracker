import { makeStyles } from "tss-react/mui";
import { CryptoState } from "../CryptoContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../components/config/api";
import { LinearProgress, Typography } from "@mui/material";
import HTMLReactParser from "html-react-parser";
import { numberWithCommas } from "../components/banner/Carousel";
import { CoinInfo } from "../components/CoinInfo";

type CoinPageProps = {};

export const CoinPage = (props: CoinPageProps) => {
    const { id } = useParams();
    const [coin, setCoin] = useState<any>();

    const { currency, symbol } = CryptoState();

    useEffect(() => {
        const fetchSingleCoin = async () => {
            try {
                const { data } = await axios.get(SingleCoin(id));

                setCoin(data);
            } catch (error: any) {
                console.log(error);
            }
        };

        fetchSingleCoin();
    }, [id]);

    console.log("SingleCoin", coin);

    const useStyles = makeStyles()((theme) => {
        return {
            container: {
                display: "flex",
                [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                    alignItems: "center",
                },
            },
            sidebar: {
                width: "30%",
                [theme.breakpoints.down("md")]: {
                    width: "100%",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 25,
                borderRight: "2px solid grey",
            },
            heading: {
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
            },
            description: {
                width: "100%",
                fontFamily: "Montserrat",
                padding: 25,
                paddingBottom: 15,
                paddingTop: 0,
                textAlign: "justify",
            },
            marketData: {
                alignSelf: "start",
                padding: 25,
                paddingTop: 10,
                width: "100%",
                // Making it responsive:
                [theme.breakpoints.down("md")]: {
                    display: "flex",
                    justifyContent: "space-around",
                },
                [theme.breakpoints.up("sm")]: {
                    flexDirection: "column",
                    alignItems: "center",
                },
                [theme.breakpoints.down("xs")]: {
                    alignItems: "start",
                },
            },
        };
    });

    const { classes } = useStyles();

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />

                <Typography variant="h3" className={classes.heading}>
                    {coin?.name}
                </Typography>

                <Typography variant="subtitle1" className={classes.description}>
                    {HTMLReactParser(
                        String(coin?.description.en.split(". ")[0])
                    )}
                    .
                </Typography>

                <div className={classes.marketData}>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                            variant="h5"
                            style={{ fontFamily: "Montserrat" }}
                        >
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>

                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" className={classes.heading}>
                            Current Price:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                            variant="h5"
                            style={{ fontFamily: "Montserrat" }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                Number(
                                    coin?.market_data.current_price[
                                        currency!.toLocaleLowerCase()
                                    ]
                                )
                            )}
                        </Typography>
                    </span>

                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" className={classes.heading}>
                            Market Cap:
                        </Typography>
                        &nbsp;&nbsp;
                        <Typography
                            variant="h5"
                            style={{ fontFamily: "Montserrat" }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                Number(
                                    coin?.market_data.market_cap[
                                        currency!.toLowerCase()
                                    ]
                                        .toString()
                                        .slice(0, -6)
                                )
                            )}
                            MM
                        </Typography>
                    </span>
                </div>
            </div>

            {/* react-chartjs-2 */}
            <CoinInfo coin={coin} />
        </div>
    );
};
