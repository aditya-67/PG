import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: '100%',
    marginTop: '25px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  alignment: {
      textAlign: 'left',
      fontSize: '1.1rem',
  },
  bold : {
      fontWeight : 'bold',
  }
});

export default function SampleDetails(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>


      {(props['sample'] === undefined) ? (<div></div>) : (
              <div>
              <Typography gutterBottom variant="h5" style={{color : '#3f51b5'}}>
      Sample #{props['activeStep'] + 1}
          </Typography>    
              <Typography gutterBottom variant="h6" component="h1" className={classes.alignment}>
        <span className={classes.bold}>Type</span> : {props['sample']['sampleType']}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2" className={classes.alignment}>
        <span className={classes.bold}>Quality</span> : {props['sample']['quality']}
          </Typography>
          </div>
          )}
          <hr></hr>
      <Typography gutterBottom variant="h6" component="h3" className={classes.alignment}>
      <span className={classes.bold}>Name</span> : {props['patientDetails']['firstname']} {props['patientDetails']['middleInitial']}  {props['patientDetails']['lastname']} 
          </Typography>
          <Typography gutterBottom variant="h6" component="h4" className={classes.alignment}>
      <span className={classes.bold}>Gender</span> : {props['patientDetails']['gender']}
          </Typography>
          <Typography gutterBottom variant="h6" component="h5" className={classes.alignment}>
      <span className={classes.bold}>DOB</span> : {props['patientDetails']['dateOfBirth']}
          </Typography>


          
          
        {/* <Typography variant="h6" component="h4">
          be
          {bull}
          nev
          {bull}o{bull}
          lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
    </Card>
  );
}