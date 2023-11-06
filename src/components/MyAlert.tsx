import { Alert, AlertTitle, Snackbar, Stack } from "@mui/material";
import { CryptoState } from "../CryptoContext";

type MyAlertProps = {};

export const MyAlert = (props: MyAlertProps) => {
    const { alert, setAlert } = CryptoState();

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setAlert({ open: false });
    };

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <Alert variant="filled" severity={alert.type} elevation={10}>
                    <AlertTitle>{alert.type}</AlertTitle>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
};
