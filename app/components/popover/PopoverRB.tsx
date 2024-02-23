import React from 'react';
import {
  Popover,
  PopoverProps,
  Box
} from '@mui/material';
import { ButtonRB } from '../button/ButtonRB';
import { styled } from '@mui/material/styles';

export const PopoverRB = ({
  anchorVertical = 'bottom',
  anchorHorizontal = 'left',
  transformVertical = 'top',
  transformHorizontal = 'center',
  onClosePopover = () => {},
  ActionComponent = <DefaultActionComponent />,
  children = <DefaultChildComponent />,
  anchorRef = {},
  sx,
  ...props
}: PopoverRBProps) => {
  const [anchorElement, setAnchorElement] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  // Set HTML Anchor ref from parent for popover to anchor to
  React.useEffect(() => {
    if (!anchorRef.current) {
      return;
    }
    setAnchorElement(anchorRef.current);
  }, [anchorRef]);

  // Handle single child
  if (!Array.isArray(children)) {
    children = [children];
  }

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!anchorElement) {
      setAnchorElement(event.currentTarget);
    }

    setIsOpen(true);
  };

  const closePopover = () => {
    onClosePopover();
    setIsOpen(false);
  };

  // Add Open functionality to ActionComponent
  const ActionComponentEl = React.cloneElement(
    ActionComponent, {
    onClick: handleOpen
  });

  // Add closePopover function to all other children
  const allChildren = children.map((child: any, index: any) => {
    return React.cloneElement(
      child, {
      key: `popover-child-${index}`,
      closePopover
    });
  });

  return (
    <div className='popover-container'>

      {ActionComponentEl}

      <Popover
        {...props}
        sx={sx}
        open={isOpen}
        anchorEl={anchorElement}
        anchorReference={'anchorEl'}
        onClose={closePopover}
        anchorOrigin={{
          vertical: anchorVertical,
          horizontal: anchorHorizontal,
        }}
        transformOrigin={{
          vertical: transformVertical,
          horizontal: transformHorizontal,
        }}>

        <PopoverBodyStyled
          data-testid='popover-body'
          className={'popover-body'}>
          {allChildren}
        </PopoverBodyStyled>

      </Popover>
    </div>
  );
}

const PopoverBodyStyled = styled(Box)(({
  theme
}: any) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    gap: theme.spacing(.5),

    '& > *': {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
    },

    '& > *:hover': {
      background: theme.palette.action.hover,
    },
  }
});

const DefaultActionComponent = ({
  onClick = () => {}
}: {
  onClick?: () => void
}) => {
  return (
    <ButtonRB onClick={onClick}>
      Open Popover
    </ButtonRB>
  );
};

const DefaultChildComponent = () => {
  return (
    <div>
      Add Popover Content
    </div>
  );
};

export interface PopoverRBProps extends Omit<PopoverProps, 'open'> {
  /**
   * Content to display in the popover
   * A closePopover() function is injected into each component
   */
  children?: Array<React.ReactElement> | React.ReactElement,
  /**
   * Component that will open Popover on click
   * A clickHandler() function is injected into this component
   */
  ActionComponent?: React.ReactElement,
  /**
   * Vertical starting point on anchor element
   */
  anchorVertical?: 'top' | 'center' | 'bottom' | number,
  /**
   * Horizontal starting point on anchor element
   */
  anchorHorizontal?: 'left' | 'center' | 'right' | number;
  /**
   * Vertical position of popover
   */
  transformVertical?: 'top' | 'center' | 'bottom' | number,
  /**
   * Horizontal position of popover
   */
  transformHorizontal?: 'left' | 'center' | 'right' | number;
  /**
   * Triggers on close
   */
  onClosePopover?: any,
  /**
   * Ref of element for Popover to anchor to
   */
  anchorRef?: any,
  /**
   * Custom styles on root Popover component
   */
  sx?: any,
};
