import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled, TableCell, TableRow } from '@material-ui/core';
import { tableCellClasses } from '@mui/material';
import { useContext, useEffect } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import { ScenarioHttpClient } from '../../service/ScenarioHttpClient';
import { TeamHighScore } from '../../model/TeamHighScore';
import './Highscores.css';

const Highscores = () => {

    const { highscores, setHighscores } = useContext(TraineeInterfaceContext);
    const scenarioHttpClient = new ScenarioHttpClient();

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
        {
            id: 'amountOfFlags',
            label: 'Amount of flags',
            minWidth: 100,
            maxWidth: 150

        }
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

        scenarioHttpClient.getCurrent(team.id)
            .then((res: any) => {
                scenarioHttpClient.getHighscores(res['message']['scenario']['id'])
                    .then((res: any) => {
                        let array: TeamHighScore[];
                        if (res['success']) {
                            array = res['message'];
                            setHighscores(array);
                        }
                        else {
                            console.log('failed')
                        }
                    })
            })
    }, []);

    return (
        <div className="wrapper">
            <div className="title">
                <h1>Highscores</h1>
            </div>
            <div className="body">
                <div className="body-flex highscores">
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table aria-label="sticky table">
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
                                    highscores.length > 0 ?
                                        highscores.map((row) => {
                                            return (
                                                <StyledTableRow hover role="checkbox" tabIndex={-1} id={row.teamName}>
                                                    <StyledTableCell size="small">
                                                        {row.teamName}
                                                    </StyledTableCell>
                                                    <StyledTableCell size="small">
                                                        {row.points}
                                                    </StyledTableCell>
                                                    <StyledTableCell size="small">
                                                        {row.amountOfFlags}
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
        </div>
    )
}
export default Highscores;