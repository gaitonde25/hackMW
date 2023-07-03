import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Avatar, Stack } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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

const steps = [
  {
    label: "Technical Interview",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Managerial Interview",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "HR Interview",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "30%",
}));

export default function Candi() {
  const [activeStep, setActiveStep] = React.useState(0);
  let candi = Candidates[0];
  const techDone = candi.Technical;
  const manDone = candi.Manager;
  const hrDone = candi.HR;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Candidate
          </Typography>
          <Button color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>

      <Stack direction="row" spacing={2}>
        <Box sx={{ width: "50%", marginLeft: "5%" }}>
          <Avatar
            sx={{ margin: "10% 0 10% 20%", width: 150, height: 150 }}
          ></Avatar>
          <Stack direction="column" spacing={4}>
            <Stack direction="row" spacing={4}>
              <Item>{Candidates[0].Name}</Item>
              <Item>{TrackMap[Candidates[0].Track]}</Item>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Item>{Candidates[0].College}</Item>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ maxWidth: 400 }}>
          <Stepper
            sx={{ marginTop: "20%" }}
            activeStep={activeStep}
            orientation="vertical"
          >
            {steps.map((step, index) => {
              let diz = false;
              console.log(index, techDone, manDone, hrDone);
              if (index === 0 && techDone) diz = true;
              if (index === 1 && manDone) diz = true;
              if (index === 2 && hrDone) diz = true;

              return (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </Stack>
    </>
  );
}
