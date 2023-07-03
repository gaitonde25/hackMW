import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Dialog from "./Dialog";

const columns = [
  {
    id: "time",
    label: "Time",
    minWidth: 170,
  },
  {
    id: "Interviewer 1",
    label: "Interviewer 1",
    minWidth: 170,
  },
  {
    id: "Interviewer 2",
    label: "Interviewer 2",
    minWidth: 170,
  },
  {
    id: "Interviewer 3",
    label: "Interviewer 3",
    minWidth: 170,
  },
  {
    id: "Interviewer 4",
    label: "Interviewer 4",
    minWidth: 170,
  },
  {
    id: "Interviewer 5",
    label: "Interviewer 5",
    minWidth: 170,
  },
  {
    id: "Interviewer 6",
    label: "Interviewer 6",
    minWidth: 170,
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  {
    time: "9:00-9:30",
    "Interviewer 1": "Candidate 1",
    "Interviewer 2": "Candidate 2",
    "Interviewer 3": "Candidate 3",
    "Interviewer 4": "Candidate 4",
    "Interviewer 5": "Candidate 5",
    "Interviewer 6": "Candidate 6",
  },
  {
    time: "9:30-10:00",
  },
  {
    time: "10:00-10:30",
  },
  {
    time: "10:30-11:00",
  },
  {
    time: "11:00-11:30",
  },
  {
    time: "11:30-12:00",
  },
  {
    time: "12:00-12:30",
  },
  {
    time: "12:30-1:00",
  },
  {
    time: "1:00-1:30",
  },
];

export default function Schedule() {
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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
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
