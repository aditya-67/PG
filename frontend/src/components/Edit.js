import React, {Component} from 'react';
import AppBar from './AppBar';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Message from './Message';
import axios from 'axios';

const classes = {
    card : {
      width: '100%',
      marginTop: '25px'
    },
    bullet : {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title : {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    alignment: {
        textAlign: 'left',
    },
    form: {
        textAlign: 'left',
        marginTop: '20px'
    },
    bold : {
        fontWeight : 'bold',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      main : {
        display: 'table',
        flexWrap: 'wrap',
      },
      textField: {
        marginRight: '30px',
        marginTop : '15px',
        width: 200,
      },
      fab : {
          position: 'fixed',
          bottom: 0,
          right: 0,
          margin: '40px',
      }
};

class Edit extends Component {
    state = {
        patientData : this.props.data,
        diagnosis : '',
        date : '',
        msgFlag : false,
    }

    handleChange = (e) => 
    {
        this.setState({diagnosis : e.target.value});
    }

    dateChange = (e) => {
        this.setState({ date: new Date(e.target.value).toISOString().slice(0, 10)});
        
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.state.patientData.diagnosis = this.state.diagnosis;
        this.state.patientData.dateOfDiagnosis = this.state.date;
        this.updateList(this.state.patientData);
        this.setState({diagnosis : ''});

    }

    updateList = (data) => {
      axios.put(`http://localhost:8000/snippets/${data.id}`, data)
      .then(res => this.setState({msgFlag : true}))
      .catch(err => console.log(err));
    }

  render() {
  return (
    <div>
      {(this.state.msgFlag) ? (<Message flag={true} msg='Saved Successfully'/>) : null}
          
      <AppBar data='Edit Proflie' />
      <Grid container direction="row" justify="center" alignItems="center" style={{margin : '25px 0px'}}>
        <Grid item xs={4}>
        <Card>
      <CardContent>

        <div>
      <Button color="primary" style={{ float: 'left', border: 'none'}} onClick={this.props.back}>Back</Button>
      <Typography gutterBottom variant="h5" component="h1" >
            Patient Details
          </Typography>
          
          </div>
          <br/>
          <hr></hr>
          <br/>
          <Typography gutterBottom variant="h6" component="h4" style={classes.alignment}>
       <span style={classes.bold}>First Name</span> : {this.props.data.firstname}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4" style={classes.alignment}>
       <span style={classes.bold}>Middle Initial</span> : {this.props.data.middleInitial}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4" style={classes.alignment}>
       <span style={classes.bold}>Last Name</span> : {this.props.data.lastname}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4" style={classes.alignment}>
       <span style={classes.bold}>Gender</span> : {this.props.data.gender}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4" style={classes.alignment}>
      <span style={classes.bold}>DOB</span> : {this.props.data.dateOfBirth}
          </Typography>

          {(this.state.msgFlag || this.state.patientData.diagnosis !== "") ? (<div>
            <Typography gutterBottom variant="h6" component="h4" style={classes.alignment}>
       <span style={classes.bold}>Diagnosis</span> : {this.state.patientData.diagnosis}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4" style={classes.alignment}>
      <span style={classes.bold}>Date of Diagnosis</span> : {this.state.patientData.dateOfDiagnosis}
          </Typography>
          </div>) : (

            <div>
            </div>
          ) }
<br/>
          <hr></hr><br/>

<form style={classes.main} noValidate autoComplete="off">
          <TextField
        name="diagnosis"
        label="Diagnosis"
        onChange={this.handleChange}
        margin="normal"
        variant="outlined"
        value={this.state.diagnosis}
      />
          
    <div>
      <Typography gutterBottom variant="h6" component="h4" style={classes.form}>
      <span style={classes.bold}>Date of Diagnosis</span>
          </Typography>
          <TextField
        id="date"
        type="date"
        style={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={this.dateChange}
      />
      </div>
        
    </form>

    <div style={{marginTop : '45px'}}>
    <Button variant="contained" color="primary" style={{margin : '0px 10px'}} onClick={this.onSubmit}>Save</Button>
    </div>
          

      </CardContent>
          </Card>
        </Grid>
      </Grid>
        
      
      
    </div>
  );
}
}

export default Edit;
