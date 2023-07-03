import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button, Stack } from "@mui/material";

const candidates = [
  {
    value: "1",
    label: "Candidate 1",
  },
  {
    value: "2",
    label: "Candidate 2",
  },
  {
    value: "3",
    label: "Candidate 3",
  },
];

const interviewers = [
  {
    value: "1",
    label: "Interviewer 1",
  },
  {
    value: "2",
    label: "Interviewer 2",
  },
  {
    value: "3",
    label: "Interviewer 3",
  },
];

const tslots = [
  {
    value: "1",
    label: "10:00 AM - 10:30 AM",
  },
  {
    value: "2",
    label: "10:30 AM - 11:00 AM",
  },
  {
    value: "3",
    label: "11:00 AM - 11:30 AM",
  },
];

const Map = () => {
  return (
    <>
      <Stack direction="column" spacing={2} sx={{ width: "30ch" }}>
        <TextField
          id="outlined-select-candidate"
          select
          label="Candidate"
          defaultValue=""
          helperText="Please select the candidate"
          sx={{ width: "25ch" }}
        >
          {candidates.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-interviewer"
          select
          label="Interviewer"
          defaultValue=""
          helperText="Please select the interviewer"
          sx={{ width: "25ch" }}
        >
          {interviewers.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-tslot"
          select
          label="Time Slot"
          defaultValue=""
          helperText="Please select the Time Slot"
          sx={{ width: "25ch" }}
        >
          {tslots.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Button
        variant="contained"
        sx={{ width: "25ch", position: "absolute", bottom: "40%", left: "3%" }}
      >
        Schedule
      </Button>
    </>
  );
};
export default Map;
