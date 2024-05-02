"use client"

import {
  Backdrop,
  CircularProgress
} from '@mui/material';

export const LoadingState = ({
  loading
}: LoadingStateProps) => {

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading || false}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export interface LoadingStateProps {
  /**
   * Spinner when true
   */
  loading: boolean
}
