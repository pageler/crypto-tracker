import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

type LoginProps = {
    handleClose: () => void;
};

export const Login = ({ handleClose }: LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAlert } = CryptoState();

    const handleSubmit = async () => {
        if (!email || !password) {
            setAlert({
                open: true,
                message: "Please fill all the Fields",
                type: "error",
            });
            return;
        }

        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(result);

            setAlert({
                open: true,
                message: `Login Successful. Welcome ${result.user.email}`,
                type: "success",
            });

            handleClose();
        } catch (error: any) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
            return;
        }
    };

    return (
        <Box
            p={3}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <TextField
                variant="outlined"
                type="email"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />

            <TextField
                variant="outlined"
                label="Enter Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />

            <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "#EEBC1D" }}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </Box>
    );
};
