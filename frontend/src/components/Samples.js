import React, { Component } from 'react';
import StepperH from './Stepper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import AppBar from './AppBar';
import Container from '@material-ui/core/Container';

class Samples extends Component {

    state = {
        data : []
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = () => {
        axios.get(`http://localhost:8000/api/samples?format=json&patientId=${this.props.data.id}`)
        .then(res => this.setState({ data : res.data }))
        .catch(err => console.log(err));
      }

      
    render(){
        return(
        <div>
          <AppBar data='Timeline of Samples'/>
          <Container fixed>
          <Button variant="outlined" color="primary" style={{margin : '20px', float: 'left'}} onClick={this.props.back}>Back</Button>
            <StepperH data={this.state.data} details={this.props.data}/>
            </Container>
            
    </div>
        );
    }
}

export default Samples;