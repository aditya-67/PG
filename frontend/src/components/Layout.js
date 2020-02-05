import React, {Component} from 'react';
import AppBar from './AppBar';
import Container from '@material-ui/core/Container';
import Patients from './Patients';
import Samples from './Samples';
import Edit from './Edit';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Message from './Message';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


const styles = {
  cardDiv: {
    position: 'fixed',
    width: '100%', 
    height: '100%', 
    zIndex: '1', 
    backgroundColor: 'rgb(168, 156, 158)', 
    top: 0, left: 0, opacity : 0.5,
  },
  card : {
    width: '20%', position: 'fixed', margin: '20px', top: '40%', left:'40%', zIndex: 2
  }
};

class Layout extends Component {
    state = {
        data : [],
        sampleFlag: false,
        editFlag: false,
        mainFlag: true,
        deleteFlag: false,
        sampleData: [],
        editData: [],
        deleteData : 0,
        msgFlag : false,
        loadFlag: true
    }

    componentDidMount() {
      this.refreshList();
    }

    refreshList = () => {
      axios.get("http://localhost:8000/api/patients?format=json")
      .then(res => this.setState({ data : res.data, loadFlag : false}))
      .catch(err => console.log(err));
    }

    showSamples = (data) => {
        this.setState({ sampleFlag : true, mainFlag: false, editFlag: false, sampleData : data} );
    }

    reload = () => {
        this.setState({ sampleFlag : false, mainFlag: true, editFlag: false});
    }

    editScreen = (data) => {
      this.setState({ sampleFlag : false, mainFlag: false, editFlag: true, editData : data} );
    }

    updatePatient = () => {
      this.setState({msgFlag : true, deleteFlag: false});
      this.refreshList();
    }

    deletePatient = (data) => {
      this.setState({ deleteFlag : true, deleteData: data});
    }

    requestDelete = () => {
      axios.delete(`http://localhost:8000/snippets/${this.state.deleteData}`)
      .then(res => this.updatePatient())
      .catch(err => console.log(err));
    }

    remove = () => {
      this.setState({deleteFlag : false});
    }



  render() {
  return (

    <div>
      {(this.state.loadFlag) ? (<CircularProgress style={{position: 'absolute', top: '50%', left: '50%' }}/>) : null}
      {(this.state.msgFlag) ? (<Message flag={true} msg='Deleted Successfully'/>) : null}
      {(this.state.deleteFlag) ? (<div>
          <div style={styles.cardDiv}></div>
    <Card style={styles.card}> 
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            Do you want to delete the patient?
          </Typography>
        </CardContent>
        <Button color="primary" variant="contained" style= {{ margin : '10px'}} onClick={this.requestDelete}>
          Yes
        </Button>
        <Button color="primary" variant="contained" style= {{ margin : '10px'}} onClick={this.remove}>
          No
        </Button>
    </Card>
    </div>) : (<div></div>)}
          {(this.state.mainFlag) ? (
              <div>
            <AppBar data='Patient Gateway'/>
            <Container fixed>
          <Patients data={this.state.data} samples={this.showSamples} edit={this.editScreen} delete={this.deletePatient}/>
          </Container>
          </div>
          ) : null}

          {(this.state.sampleFlag) ? (<Samples data={this.state.sampleData} back={this.reload}/>) : null}

          {(this.state.editFlag) ? (<Edit data={this.state.editData} back={this.reload} editDetails={this.updatePatient}/>) : null}
        
      
      
    </div>
  );
}
}

export default Layout;
