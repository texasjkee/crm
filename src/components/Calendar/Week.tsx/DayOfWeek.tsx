import React from "react";
import { Typography, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { days } from "common/const";

const Item = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
}));

export const DayOfWeek = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={14}>
                {/* Render the days as column headers */}
                {days.map((day, index) => (
                    <Grid key={index} item xs={2}>
                        <Item>
                            <Typography variant='subtitle2' align='center'>
                                {day}
                            </Typography>
                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
