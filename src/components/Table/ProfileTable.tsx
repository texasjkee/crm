import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFetchAllEvents } from "common/hooks/useFetchAllEvents";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

export default function ProfileTable() {
    const tasks = useFetchAllEvents();

    const filterByPrice = () => {
        console.log(tasks);
    };

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size='small'
                aria-label='a dense table'
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Names</TableCell>
                        <TableCell align='right'>Date</TableCell>
                        <TableCell align='right' onClick={filterByPrice}>
                            Price
                            <ArrowDropDownIcon />
                        </TableCell>
                        <TableCell align='right'>IsDone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks?.map((task) => (
                        <TableRow
                            key={task.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component='th' scope='row'>
                                {task.name}
                            </TableCell>
                            <TableCell align='right'>{task.date}</TableCell>
                            <TableCell align='right'>{task.price}</TableCell>
                            <TableCell align='right'>
                                {task.isDone ? "true" : "false"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
