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
import Interviewers from "../data/Interviewers.js";
import Candidates from "../data/Candidates";

const startTime = new Date();
startTime.setHours(9, 0, 0); // Set start time to 9am

const endTime = new Date();
endTime.setHours(17, 0, 0); // Set end time to 5pm

// Define the time slot interval in minutes
const interval = 15;

// Create an array to store the time slots
const timeSlots = [];

// Loop through the time range and generate time slots
let currentTime = startTime;
while (currentTime < endTime) {
  // Format the current time
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Add the formatted time to the time slots array
  timeSlots.push(formattedTime);

  // Increment the current time by the interval
  currentTime = new Date(currentTime.getTime() + interval * 60000);
}

const getName = (id) => {
  return Candidates.find((candidate) => candidate.ID === id).Name;
};

const columns = Array(31).fill({});
columns[0] = { id: "time", label: "Time", minWidth: 170 };
for (let i = 1; i < 31; i++) {
  columns[i] = {
    id: `Interviewer ${i}`,
    label: Interviewers[i - 1].Name,
    minWidth: 170,
  };
}

const rows = Array(32).fill({});

for (let i = 0; i < 32; i++) {
  rows[i] = {};
  Interviewers.forEach((interviewer, index) => {
    let candi = interviewer[`Free_${i + 1}`];
    if (candi === 0) candi = "BUSY";
    else if (candi === 1) candi = "FREE";
    else candi = getName(candi);

    rows[i][`Interviewer ${interviewer.ID}`] = candi;
    rows[i][`time`] = timeSlots[i];
  });
}

console.log(rows);

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
    <div
      style={{
        width: "80%",
        maxWidth: "1800px",
        height: "80%",
        maxHeight: "1000px",
      }}
    >
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
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
    </div>
  );
}
