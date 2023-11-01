import {
    AppBar,
    Container,
    MenuItem,
    Select,
    SelectChangeEvent,
    ThemeProvider,
    Toolbar,
    Typography,
    createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { CryptoState } from "../CryptoContext";

type HeaderProps = {};

export const Header = (props: HeaderProps) => {
    const navigate = useNavigate();

    const { currency, setCurrency } = CryptoState();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        },
    });

    const useStyles = makeStyles()(() => {
        return {
            title: {
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
            },
        };
    });

    const { classes } = useStyles();

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            className={classes.title}
                            onClick={() => navigate("/")}
                        >
                            Crypto-Tracker Home
                        </Typography>

                        <Select
                            variant="outlined"
                            style={{
                                width: 100,
                                height: 40,
                                marginRight: 15,
                            }}
                            value={currency}
                            onChange={(e: SelectChangeEvent) =>
                                setCurrency!(e.target.value)
                            }
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"GBP"}>GBP</MenuItem>
                            <MenuItem value={"EUR"}>EUR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};
