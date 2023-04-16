import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'rank', label: 'Rank', minWidth: 100, align: 'center'},
  { id: 'competition', label: 'Competitor', minWidth: 120 },
  {
    id: 'record',
    label: 'Record',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'winnings',
    label: 'Avg. Opp. Wins',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(rank, competition, record, winnings) {
  return {rank, competition, record, winnings};
}

const rows = [
  createData(1, 'Atlanta Classic League', '5-0', '------' ),
  createData(2, 'Marietta Mash League', '5-0', '------' ),
  createData(3, 'Punchshot Tournament', '---', '------' ),
  createData(4, 'USA PickleBall - Atlanta Open', '---', '------' ),
  createData(5, 'Alpharetta Youth League', '3-2', '------' ),
  createData(6, 'Atlanta Classic Open - Mixed Doubles', '---', '------' ),
  createData(7, 'Cumming Tournament - Men\'s Singles', '---', '------' ),
  createData(8, 'Jong Liu Memorial Open - Men\'s Doubles', '---', '------' ),
  createData(9, 'Atlanta Tournament - Mixed Doubles', '---', '------' ),
  createData(10, 'Harry Schuster\'s Invitational League', '0-5', '------' )
];

export default function TournamentTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper elevation={0} sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: 430}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ 
                    minWidth: column.minWidth,
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: 'calc(0.3em + 1vw)',
                   }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell 
                          key={column.id} 
                          align={column.align}
                          style={{ 
                            fontFamily: "Inter",
                            fontWeight: 400,
                           }}
                          >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
            }