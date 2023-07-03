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

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "Track", label: "Track", minWidth: 170 },
];

const TrackMap = {
  1: "Signal Processing",
  2: "Control Systems",
  3: "Embedded",
  4: "VLSI",
  5: "CS",
  6: "Manager",
  7: "HR",
};
const tracks = [];

Interviewers.forEach((interviewer) => {
  let tracks_tenp = [];
  if (interviewer.Track_1 != null)
    tracks_tenp.push(TrackMap[interviewer.Track_1]);
  if (interviewer.Track_2 != null)
    tracks_tenp.push(TrackMap[interviewer.Track_2]);
  if (interviewer.Track_3 != null)
    tracks_tenp.push(TrackMap[interviewer.Track_3]);
  if (interviewer.Track_4 != null)
    tracks_tenp.push(TrackMap[interviewer.Track_4]);
  if (interviewer.Track_5 != null)
    tracks_tenp.push(TrackMap[interviewer.Track_5]);
  tracks.push(tracks_tenp);
});

const intrLength = Interviewers.length;
const rows = Array(intrLength).fill({});
Interviewers.forEach((interviewer, index) => {
  let trac = "";
  tracks[index].forEach((track) => {
    trac += track + ", ";
  });
  rows[index] = {
    name: interviewer.Name,
    Track: trac.slice(0, -2),
  };
});

export default function IntrList() {
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
      <h1>Interviewers List </h1>
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
