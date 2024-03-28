import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { FC } from 'react';

const steps = [
  'Sources',
  'Template & Topic',
  'Draft',
];

interface StepperProgressProps {
  activeStep: number;
}


const StepperProgress: FC<StepperProgressProps> = (props) => {
  const {activeStep } = props;

  return (
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );
};

export default StepperProgress;
