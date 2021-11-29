import './Guide.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { GuideHttpClient } from '../../service/GuideHttpClient';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import { useContext, useEffect, useState } from 'react';
import { Hint } from "../../model/Hint";


const Guide = () => {
    const [hintNr, setHintNr] = useState(1);
    const [elementLabel, setElementLabel] = useState('test');
    const [firstHintId, setFirstHintId] = useState(0);
    const [lastHintId, setLastHintId] = useState(0);
    const { hint, setHint } = useContext(TraineeInterfaceContext);
    const guideHttpClient = new GuideHttpClient();
 

    // decrement
    const decrement = () => {
      if(hintNr >= firstHintId + 1)
      {
        setHintNr(hintNr-1);
        getArrayElement();
        console.log('After decrease: ' + hintNr);
        console.log(elementLabel)
      }
      else
      {
        console.log('Number is 1')
      }
    }

    // increment
    const increment = () => {
      if(hintNr <= lastHintId - 1)
      {
        setHintNr(hintNr+1);
        getArrayElement();
        console.log('After increase: ' + hintNr);
        console.log(elementLabel)
      }
      else
      {
        console.log('Number is Max')
      }
    }

    // testing array
    const columns = [
      {
          id: 1,
          label: '123',
      },
      {
          id: 2,
          label: 'Points',
      },
      {
          id: 3,
          label: 'Amount',
      },
      {
          id: 4,
          label: 'Test',
      },
      {
          id: 5,
          label: 'a a a',
      },
      {
          id: 6,
          label: 'b b b',
      },
      {
          id: 7,
          label: 'TSM TSM TSM',
      },
      {
          id: 8,
          label: 'Job I need the backend',
      },
      {
          id: 9,
          label: 'Bulgaria numba one',
      },
      {
          id: 10,
          label: 'Social credit +++',
      }
    ];
    
    // set label and image
    const getArrayElement = () => {
      columns.forEach(element => {
        if(element.id === hintNr)
        {
          setElementLabel(element.label);
          // console.log(elementLabel) 
          // console.log(element.label)
        }
      });

      

    }

    // get the first and last hint ids of a scenario
    const setFirstAndLastHintIds = () => {
      // to be changed with appropriate call
      setFirstHintId(1);

      // to be changed with appropriate call
      setLastHintId(10);
    }

    // Get current scenario id and increment number
    // Display scenerio and add time to the team
    // Check if the hint is seen -> Add a record that the team have seen the hint and add time penalty 


    return (
        <div className="wrapper">
            <div className="title">
                <h1>Guide</h1>
            </div>
            <div className="body">
                <div className="body-flex">
                  <p>{hintNr}|</p>
                  {/* <p>{columns[hintNr].label}</p> */}
                  <p>{elementLabel}</p>
                  <img src="" alt=""/>
                  <Button onClick={decrement} variant="outlined">Previous</Button>
                  <Button onClick={increment} variant="outlined">Next</Button>
                </div>
            </div>
        </div>
    )
}

export default Guide;