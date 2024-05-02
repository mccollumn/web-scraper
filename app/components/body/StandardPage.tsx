"use client"

import {
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingState } from './LoadingState';

export const StandardPage = ({
  className,
  title,
  description,
  CallToAction,
  sx,
  children,
  loading
}: StandardPageProps) => {
  return (
    <ContainerStyled
      sx={sx}
      className={
        [
          "rb-standard-page-container",
          className
        ].join(" ")
      }>

      <LoadingState
        loading={loading}
      />

      <Box
        className='standard-page-header'>

        <Box className='standard-page-title'>
          <Title title={title} />
          <Description description={description} />
        </Box>

        <Box
          className='standard-call-to-action'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
          }}>

          {CallToAction}

        </Box>

      </Box>

      <Divider
        sx={{
          margin: '0 -24px 0 -24px',
        }}
      />

      <BodyStyled className="standard-page-body-wrapper">
        {children}
      </BodyStyled>

    </ContainerStyled>
  );
}

const ContainerStyled = styled(Box)(({
  theme
}: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(.5),

    '.standard-page-header': {
      display: 'flex',

      '.standard-page-title': {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        gap: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },

      '.standard-call-to-action': {
        
      }


    }

  }
});

const BodyStyled = styled(Box)(({
  theme
}: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(4),
  }
});

const Title = ({title}: any) => {
  if(!title) return null;

  return (
    <Typography variant='h3'>
      {title}
    </Typography>    
  )

}

const Description = ({description}: any) => {
  if(!description) return null;

  return (
    <Typography variant='body1'>
      {description}
    </Typography>    
  )

}

export interface StandardPageProps {
  /**
   * Header title to display
   */
  title?: String
  /**
   * Description of the page
   */
  description?: String
  /**
   * Call to Action
   */
  CallToAction?: any
  /**
   * Show spinner on true
   */
  loading?: any
  /**
   * Extend class on body element
   */
  className?: String
  /**
   * Extend css
   */
  sx?: any
  /**
   * All children
   */
  children?: any
}
