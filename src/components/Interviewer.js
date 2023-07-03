import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Avatar, Stack } from "@mui/material";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Slide from "@mui/material/Slide";
import Badge from "@mui/material/Badge";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Candidates from "../data/Candidates";
import Interviewers from "../data/Interviewers.js";

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

const columns = [
  {
    id: "time",
    label: "Time Slot",
    minWidth: 170,
  },
  {
    id: "Interviews",
    label: "Interviews",
    minWidth: 100,
  },
  {
    id: "availability",
    label: "Availability",
    minWidth: 170,
  },
];

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getName = (id) => {
  return Candidates.find((candidate) => candidate.ID === id).Name;
};

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = Array(32).fill({});
for (let i = 0; i < 32; i++) {
  rows[i] = {};
  let candi = Interviewers[0][`Free_${i + 1}`];
  let avail = "Scheduled";
  if (candi === 0) {
    candi = "";
    avail = "BUSY";
  } else if (candi === 1) {
    candi = "";
    avail = "FREE";
  } else candi = getName(candi);

  rows[i][`Interviews`] = candi;
  rows[i][`time`] = timeSlots[i];
  rows[i][`availability`] = avail;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "30%",
}));

export default function Interviewer() {
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
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Interviewer
          </Typography>
          <Button color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: "50%", marginLeft: "5%" }}>
          <div style={{ margin: "10% 0 10% 20%" }}>
            <Badge badgeContent="  " color="primary">
              <Avatar sx={{ width: 150, height: 150 }}></Avatar>
            </Badge>
          </div>
          <Stack direction="column" spacing={4}>
            <Stack direction="row" spacing={4}>
              <Item>{Interviewers[0][`Name`]}</Item>
              <Item>
                {tracks[0][0]}, {tracks[0][1]}
              </Item>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Item>Interviews taken</Item>
              <Item>Interviews remaining</Item>
            </Stack>
          </Stack>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "grey",
              borderRadius: "10px",
              height: "30%",
              width: "60%",
              marginTop: "10%",
            }}
          >
            <p
              style={{
                marginBottom: "10%",
                paddingTop: "10%",
                fontFamily: "serif",
                color: "white",
                fontFamily: "Helvetica Neue, sansSerif",
                fontSize: "40px",
                fontWeight: "bold",
                letterSpacing: "-1px",
                lineHeight: "1",
                textAlign: "center",
              }}
            >
              Time Left for next interview{" "}
            </p>
            <Box component="span" sx={{ p: 2, border: "1px dashed red" }}>
              45 mins
            </Box>
          </div>
        </Box>
        <div style={{ marginTop: "10%", width: "40%" }}>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
            }}
          >
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
      </Stack>
    </>
  );
}
