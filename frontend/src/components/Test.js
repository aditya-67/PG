import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

function Pagination(length) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
    );
  }


class Test extends Component {

    state = {
        page : 0,
        rowsPerPage : 5,
        maxPages: 0,
    }

    componentDidMount(){
        this.setState({ maxPages : parseInt(rows.length/this.state.rowsPerPage) + 1});
    }

    handleChangePage = () => {

        this.setState({ page : 2});
      }
    
    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage : parseInt(event.target.value, 10)});
        this.setState({ page : 0});
      }
  
 render(){
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);

  return (
    <Paper>
      <div>
        <Table>
          <TableBody>
            {rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
                {/* <Pagination length={rows.length} /> */}
 <TablePagination
           rowsPerPageOptions={[5, 10, 25]}
           component="div"
           count={rows.length}
           rowsPerPage={this.state.rowsPerPage}
           page={this.state.page}
           backIconButtonProps={{
             'aria-label': 'previous page',
           }}
           nextIconButtonProps={{
             'aria-label': 'next page',
           }}
           onChangePage={this.handleChangePage}
           onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  )};
}

export default Test;