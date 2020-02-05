import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


class Patients extends Component {    
    render(){
        

        return(
          <div style={{margin : '25px 10px'}}>
        
            <Paper>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell >Gender</TableCell>
            <TableCell >DOB</TableCell>
            <TableCell >Diagnosis</TableCell>
            <TableCell >Date of Diagnosis</TableCell>
            <TableCell style={{textAlign : 'center'}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.data.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.firstname} {row.middleInitial} {row.lastname}
              </TableCell>
              <TableCell >{row.gender}</TableCell>
              <TableCell >{row.dateOfBirth}</TableCell>
              <TableCell >{row.diagnosis}</TableCell>
              <TableCell >{row.dateOfDiagnosis}</TableCell>
              <TableCell >
              <Button variant="outlined" color="primary" style={{margin : '0px 10px'}} onClick={this.props.samples.bind(this, row)}>Samples</Button>
              <Button variant="outlined" color="primary" style={{margin : '0px 10px'}} onClick={this.props.edit.bind(this, row)}>Edit</Button>
              <IconButton aria-label="delete" onClick={this.props.delete.bind(this, row.id)}>
                <DeleteIcon />
            </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Pagination rows={this.props.data} /> */}
    </Paper>

    </div>
        );
    }
}

export default Patients;