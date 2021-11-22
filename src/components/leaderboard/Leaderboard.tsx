import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled, TableCell, TableRow } from '@material-ui/core';
import { tableCellClasses } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import { ScenarioHttpClient } from '../../service/ScenarioHttpClient';
import { LeaderBoardEntry } from '../../model/LeaderboardEntry';
import './Leaderboard.css';
import Timer from '../timer/Timer';

const Leaderboard = () => {

    const { leaderboard, setLeaderboard, leaderboardData, setLeaderboardData, timer } = useContext(TraineeInterfaceContext);
    const [alert, setAlert] = useState('');
    const [fetchLeaderBoard, setFetchLeaderBoard] = useState(false);
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
        let team;
        try {
            const teamObj = localStorage.getItem('team');
            if (teamObj) {
                team = JSON.parse(teamObj);
            }
        }
        catch (e) {
            console.log(e);
        }
        scenarioClient.getCurrent(team.id)
            .then((res: any) => {
                scenarioClient.fetchLeaderBoard(res['message']['scenario']['id'])
                    .then((res: any) => {
                        if (res['success']) {
                            console.log(res['message']);
                            let leaderboard: LeaderBoardEntry[];
                            leaderboard = res['message'];
                            setLeaderboardData(leaderboard);
                            setFetchLeaderBoard(true);
                        }
                        else {
                            setAlert(res['message']);
                        }
                    });
            })

    }, []);


    useEffect(() => {
        setTimeout(() => {
            let leaderboardTemp: LeaderBoardEntry[];
            let leaderboardArray: LeaderBoardEntry[] = [];
            leaderboardTemp = leaderboardData;
            leaderboardTemp.forEach((item: LeaderBoardEntry, index: any) => {
                if (timer > item.totalSeconds) {
                    const foundIndex = leaderboardArray.findIndex(x => x['teamId'] === item.teamId);
                    if (foundIndex > -1) {
                        leaderboardArray[foundIndex].points += item.points;
                    }
                    else {
                        leaderboardArray.push(item);
                    }
                }
            });
            leaderboardArray.sort(function (a: any, b: any) {
                return b["points"] - a["points"];
            });
            setLeaderboard(leaderboardArray);
            setFetchLeaderBoard(!fetchLeaderBoard);

        }, 1000);
    }, [fetchLeaderBoard]);

    //Todo: Get team score, set timer when training starts

    return (
        <div className="wrapper">
            <div className="title">
                <h1>Leaderboard</h1>
            </div>
            <div className="body">
                <div className="leaderboard body-flex">
                    <Timer />
                    <div>{alert}</div>
                    {
                        leaderboard && leaderboard.length > 0 ?
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
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            : <div>No scores available yet</div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Leaderboard;