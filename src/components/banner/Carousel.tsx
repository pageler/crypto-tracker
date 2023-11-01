import AliceCarousel from "react-alice-carousel";
import { makeStyles } from "tss-react/mui";
import { CryptoState } from "../../CryptoContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { Link } from "react-router-dom";

type CarouselProps = {};

export function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Carousel = (props: CarouselProps) => {
    const [trending, setTrending] = useState([]);

    const useStyles = makeStyles()(() => {
        return {
            carousel: {
                height: "50%",
                display: "flex",
                alignItems: "center",
            },
            carouselItems: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "white",
            },
        };
    });

    const { classes } = useStyles();

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    const { currency, symbol } = CryptoState();

    useEffect(() => {
        const fetchTrendingCoins = async () => {
            try {
                const { data } = await axios.get(TrendingCoins(currency));

                console.log("TrendingCoins", data);
                setTrending(data);
            } catch (error: any) {
                console.log(error);
            }
        };

        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin: any) => {
        let profit = Number(coin?.price_change_percentage_24h >= 0);

        return (
            <Link to={`/coins/${coin.id}`} className={classes.carouselItems}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />

                <span>
                    {coin?.symbol} &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(10, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit > 0 && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
                disableButtonsControls
            />
        </div>
    );
};
