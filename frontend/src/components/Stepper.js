import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import EnhancedTable from './EnhancedTable';
import SampleDetails from './SampleDetails';
import { Grid } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps(rows) {
  const dates = []
  rows = rows[Object.keys(rows)[0]];
  rows.forEach(element => {
    dates.push(element['date']);
  });
  return dates;
}

export default function StepperH(props) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState(null);
  const steps = getSteps(props);
  const details = props[Object.keys(props)[0]];
  const [url, setUrl] = React.useState(null);


  const handleStep = step => () => {
    setActiveStep(step);
    setUrl(`http://localhost:8000/api/variants?format=json&sampleId=${details[step]['id']}`);
  };

  useEffect(() => {
    let flag = true;
    if(details.length > 0 && flag){
      setUrl(`http://localhost:8000/api/variants?format=json&sampleId=${details[activeStep]['id']}`);
      flag = false;
      if(url !== null){
      axios.get(url)
      .then(res => setData(res.data));
      }      
    }
      
  }, [url, details]);

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
              >
                {label.split('T')[0]}<br/>
                {label.split('T')[1].slice(0, -1)}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
        
      <div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
        <SampleDetails sample={details[activeStep]} patientDetails={props['details']} activeStep={activeStep}/>
        </Grid>
        <Grid item xs={9}>
        <EnhancedTable data={data}/>
        </Grid>
      </Grid>
        </div>
    </div>
  );
}
