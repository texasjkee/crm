import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#503E9D",
        },
        secondary: {
            main: "#FCD561",
        },
    },
});
theme.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
        fontSize: "1.5rem",
    },
};
