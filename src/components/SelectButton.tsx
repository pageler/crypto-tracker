import { makeStyles } from "tss-react/mui";

type SelectButtonProps = {
    selected: boolean;
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLSpanElement>;
};

export const SelectButton = ({
    selected,
    children,
    onClick,
}: SelectButtonProps) => {
    const useStyles = makeStyles()(() => {
        return {
            selectButton: {
                border: "1px solid gold",
                borderRadius: 5,
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                fontFamily: "Montserrat",
                cursor: "pointer",
                backgroundColor: selected ? "gold" : "",
                color: selected ? "black" : "",
                fontWeight: selected ? 700 : 500,
                "&:hover": {
                    backgroundColor: "gold",
                    color: "black",
                },
                width: "22%",
                margin: 5,
            },
        };
    });

    const { classes } = useStyles();

    return (
        <span onClick={onClick} className={classes.selectButton}>
            {children}
        </span>
    );
};
