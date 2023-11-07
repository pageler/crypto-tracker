import Drawer from "@mui/material/Drawer";
import { Fragment, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { Avatar, Button } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { numberWithCommas } from "../banner/Carousel";
import { AiFillDelete } from "react-icons/ai";

type UserSidebarProps = {};

type Anchor = "right";

const useStyles = makeStyles()({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },
    logout: {
        height: "8%",
        width: "100%",
        backgroundColor: "#EEBC1D",
        marginTop: 20,
    },
    picture: {
        width: 200,
        height: 200,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
        objectFit: "contain",
    },
    watchlist: {
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
    },
    coin: {
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EEBC1D",
        boxShadow: "0 0 3px black",
    },
});

export const UserSidebar = (props: UserSidebarProps) => {
    const [state, setState] = useState({
        right: false,
    });
    const { user, setAlert, watchlist, coins, symbol } = CryptoState();

    console.log("Watchlist, coins", watchlist, coins);

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };

    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successful !",
        });
    };

    const removeFromWatchlist = async (coin: any) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(
                coinRef,
                { coins: watchlist.filter((wish: any) => wish !== coin?.id) },
                { merge: true }
            );

            setAlert({
                open: true,
                message: `${coin.name} Removed from the Watch List !`,
                type: "success",
            });
        } catch (error: any) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    };

    const { classes } = useStyles();

    return (
        <div>
            {(["right"] as const).map((anchor) => (
                <Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D",
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <div className={classes.watchlist}>
                                    <span
                                        style={{
                                            fontSize: 15,
                                            textShadow: "0 0 5px black",
                                        }}
                                    >
                                        Watch List
                                    </span>
                                    {coins.map((coin: any) => {
                                        if (watchlist.includes(coin.id))
                                            return (
                                                <div
                                                    key={coin.id}
                                                    className={classes.coin}
                                                >
                                                    <span>{coin.name}</span>
                                                    <span
                                                        style={{
                                                            display: "flex",
                                                            gap: 8,
                                                        }}
                                                    >
                                                        {symbol}{" "}
                                                        {numberWithCommas(
                                                            Number(
                                                                coin.current_price.toFixed(
                                                                    2
                                                                )
                                                            )
                                                        )}
                                                        <AiFillDelete
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            fontSize="16"
                                                            onClick={() =>
                                                                removeFromWatchlist(
                                                                    coin
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                </div>
                                            );
                                        else
                                            return (
                                                <Fragment
                                                    key={coin.id}
                                                ></Fragment>
                                            );
                                    })}
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                className={classes.logout}
                                onClick={logOut}
                            >
                                Log Out
                            </Button>
                        </div>
                    </Drawer>
                </Fragment>
            ))}
        </div>
    );
};
