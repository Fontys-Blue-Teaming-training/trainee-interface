import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled, TableCell, TableRow } from '@material-ui/core';
import { tableCellClasses } from '@mui/material';
import { useContext, useEffect } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import './Leaderboard.css';
import { ScenarioHttpClient } from '../../service/ScenarioHttpClient';
import { LeaderBoardEntry } from '../../model/LeaderboardEntry';

const Leaderboard = () => {

    const { leaderboard, setLeaderboard } = useContext(TraineeInterfaceContext);
    const scenarioClient = new ScenarioHttpClient();

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "orange",
            color: theme.palette.action.hover,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const columns = [
        {
            id: 'position',
            label: 'Position',
            minWidth: 100,
            maxWidth: 150
        },
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

    useEffect(() => {
        scenarioClient.fetchLeaderBoard(1)
            .then((res: any) => {
                if (res['success']) {
                    let leaderboardTemp: LeaderBoardEntry[];
                    let leaderboardArray: LeaderBoardEntry[] = [];
                    leaderboardTemp = res['message'];
                    leaderboardTemp.forEach((item: LeaderBoardEntry, index: any) => {
                        const foundIndex = leaderboardArray.findIndex(x => x['teamId'] === item.teamId);
                        if (foundIndex > -1) {
                            leaderboardArray[foundIndex].points += item.points;
                        }
                        else {
                            leaderboardArray.push(item);
                        }
                    })
                    leaderboardArray.sort(function (a: any, b: any) {
                        return b["points"] - a["points"];
                    });

                    setLeaderboard(leaderboardArray as LeaderBoardEntry[]);
                }
            })
    }, []);

    return (
        <div className="leaderboard-wrapper">
            <div className="leaderboard">
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table>
                        <TableHead className="table-head">
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
                                leaderboard && leaderboard.length > 0 ?
                                    leaderboard.map((row, index) => {
                                        return (
                                            <StyledTableRow hover role="checkbox" tabIndex={-1} id={row.flagId.toString()}>
                                                <StyledTableCell size="small">
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell size="small">
                                                    {row.teamName.toString()}
                                                </StyledTableCell>
                                                <StyledTableCell size="small">
                                                    {row.points.toString()}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    })
                                    :
                                    null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
export default Leaderboard;