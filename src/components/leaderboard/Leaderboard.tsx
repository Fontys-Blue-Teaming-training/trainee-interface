import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled, TableCell, TableRow } from '@material-ui/core';
import { tableCellClasses } from '@mui/material';
import { useContext } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import './Leaderboard.css';

const Leaderboard = () => {

    const { leaderboard, setLeaderboard } = useContext(TraineeInterfaceContext);

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#2A2B2E",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const columns = [
        {
            id: 'teamName',
            label: 'Team Name',
            minWidth: 100,
            maxWidth: 150
        },
        {
            id: 'points',
            label: 'Points',
            minWidth: 100,
            maxWidth: 150

        },
    ];

    return (
        <div className="leaderboard-wrapper">
            <div className="leaderboard">
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table aria-label="sticky table">
                        <TableHead>
                            <StyledTableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={"left"}
                                        style={{ width: column.maxWidth }}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {
                                leaderboard.length > 0 ?
                                    leaderboard.map((row) => {
                                        return (
                                            <StyledTableRow hover role="checkbox" tabIndex={-1} id={row.flagId.toString()}>
                                                <StyledTableCell size="small">
                                                    {row.teamName}
                                                </StyledTableCell>
                                                <StyledTableCell size="small">
                                                    {row.points}]
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    })
                                    :
                                    <div></div>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
export default Leaderboard;