import {
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  ButtonRB,
} from '../button/ButtonRB';

export const FormButtonRow = ({
  submitButtonText = 'Submit',
  resetButtonText = 'Cancel',
  onCancel
}: FormButtonRowProps) => {

  const isShowButtons = [
    submitButtonText,
    resetButtonText,
  ].some((b: any) => !!b)

  if(!isShowButtons) {
    return null;
  }

  return (
    <ButtonRowStyled className="rb-form-button-row">

      <ResetButton
        resetButtonText={resetButtonText}
        onCancel={onCancel}
      />

      <SubmitButton
        submitButtonText={submitButtonText}
      />
    </ButtonRowStyled>
  );
}

const SubmitButton = ({
  submitButtonText
}: any) => {

  if(!submitButtonText) {
    return null;
  }

  return (
    <ButtonRB type="submit">
      {submitButtonText}
    </ButtonRB>
  );
}

const ResetButton = ({
  resetButtonText,
  onCancel
}: any) => {

  if(!resetButtonText) {
    return null;
  }

  return (
    <ButtonRB
      onClick={onCancel}
      color={'inherit'}>
      {resetButtonText}
    </ButtonRB>
  );
}

const ButtonRowStyled = styled(Box)(({
  theme
}) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '24px'
}));

export interface FormButtonRowProps {
  /**
   * Displays submit button with given text
   * Submits form on click
   */
  submitButtonText?: string
  /**
   * Displays reset button with given text
   * Resets form with default values on click
   */
  resetButtonText?: string
  /**
   * Cancel button click override
   */
  onCancel?: Function
}
