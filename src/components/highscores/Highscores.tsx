import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { FormControl, InputLabel, MenuItem, Select, styled, TableCell, TableRow } from '@material-ui/core';
import { tableCellClasses } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import { ScenarioHttpClient } from '../../service/ScenarioHttpClient';
import { TeamHighScore } from '../../model/TeamHighScore';
import { Scenario } from "../../model/Scenario";
import './Highscores.css';
import { GuideHttpClient } from '../../service/GuideHttpClient';

const Highscores = () => {

    const { highscores, setHighscores } = useContext(TraineeInterfaceContext);
    const [alert, setAlert] = useState('');
    const scenarioHttpClient = new ScenarioHttpClient();
    const [attackSelection, setAttackSelection] = useState(0);
    const [scenarios, setScenarios] = useState([] as Scenario[]);
    const guideClient = new GuideHttpClient();

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
            id: 'amountOfFlags',
            label: 'Amount of flags',
            minWidth: 100,
            maxWidth: 150

        },
        {
            id: 'completionTime',
            label: 'Completion Times',
            minWidth: 100,
            maxWidth: 150

        }
    ];


    const formatTime = (totalSeconds: number) => {
        const getHours = `0${Math.floor(totalSeconds / 3600)}`.slice(-2);
        let remainingSeconds = totalSeconds % 3600;
        const getMinutes = `0${Math.floor(remainingSeconds / 60)}`.slice(-2);
        remainingSeconds = remainingSeconds % 60;
        const getSeconds = `0${Math.floor(remainingSeconds)}`.slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}`
    }

    const handleChange = (event: any) => {
        setAttackSelection(event.target.value);
    };

    useEffect(() => {
        let team: any;
        try {
            const teamObj = localStorage.getItem('team');
            if (teamObj) {
                team = JSON.parse(teamObj);
            }
        }
        catch (e) {
            console.error(e);
        }
        scenarioHttpClient.getHighscores(attackSelection)
            .then((res: any) => {
                let array: TeamHighScore[];
                if (res['success']) {
                    array = res['message'];
                    array.forEach((highscore) => {
                        highscore.timer = formatTime(highscore.totalSeconds);
                    });
                    setHighscores(array);
                }
                else {
                    setAlert(res['message']);
                }
            });
    }, []);

    return (
        <div className="wrapper">
            <div className="title">
                <h1>Highscores</h1>
            </div>
            <div className="body">
                <div className="body-flex highscores">
                    <div className="select-div">
                        <FormControl variant="standard" className="select-scenario">
                            <InputLabel id="demo-simple-select-standard-label">Attack</InputLabel>
                            <Select
                                className="select"
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={attackSelection}
                                onChange={handleChange}
                                label="Attack"
                            >
                                <MenuItem value="-1">
                                    <em>None</em>
                                </MenuItem>

                                {scenarios.map((scenario) =>
                                    <MenuItem value={scenario.id} key={scenario.id}> {scenario.name} </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    {
                        highscores.length > 0 ?
                            <>
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
                                                highscores.map((row) => {
                                                    return (
                                                        <StyledTableRow hover role="checkbox" tabIndex={-1} id={row.teamName}>
                                                            <StyledTableCell size="small">
                                                                {row.teamName}
                                                            </StyledTableCell>
                                                            <StyledTableCell size="small">
                                                                {row.amountOfFlags}
                                                            </StyledTableCell>
                                                            <StyledTableCell size="small">
                                                                {row.timer}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    );
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                            :
                            <div>No highscores available</div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Highscores;