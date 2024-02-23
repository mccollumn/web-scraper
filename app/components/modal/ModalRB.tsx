import React from 'react';
import { ButtonRB } from '../button/ButtonRB';
import {
  Modal,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Standard Modal
 */
export const ModalRB = ({
  ActionComponent = <DefaultActionComponent />,
  BodyComponent = <DefaultBodyComponent />,
  disableBackdropClick = true,
  closePopover = () => { },
  title,
  description,
  open = false,
  sx
}: ModalRBProps) => {

  const [openState, setOpenState] = React.useState(open);
  const modalPreventReasons = ['backdropClick', 'escapeKeyDown'];

  // Handle open state when updated from parent
  React.useEffect(() => {
    setOpenState(open);
  }, [open])

  const handleOpen = (event: any) => {
    event.stopPropagation();
    setOpenState(true);
  };

  const closeModal = (event: any, reason: string) => {
    if (event) {
      event.stopPropagation();
    }

    // Prevent closing modal on backdrop click and escape key
    const isPrevented = modalPreventReasons.some((s) => s === reason);
    if (disableBackdropClick && isPrevented) {
      return;
    }

    setOpenState(false);
    closePopover();
  };

  // Add Open functionality to passed in Action component
  const ActionComponentEl = React.cloneElement(ActionComponent, {
    onClick: handleOpen
  });

  return (
    <div className="modalrb-container">
      {ActionComponentEl}

      <Modal
        aria-labelledby="modalrb-title"
        aria-describedby={"modalrb-description"}
        data-testid="modalrb-modal"
        open={openState}
        sx={sx}
        onClose={closeModal}>

        <ModalBody
          title={title}
          description={description}
          BodyComponent={BodyComponent}
          closeModal={closeModal}
        />

      </Modal>
    </div>
  );
};

const ModalBody = React.forwardRef((
  {
    classes,
    title,
    description,
    BodyComponent,
    closeModal,
    ...props
  }: any,
  ref1: any
) => {

  // Inject closeModal function,
  // height, and width of Modal
  const BodyComponentEl = React.cloneElement(BodyComponent, {
    closeModal
  });

  return (
    <ModalBodyStyled
      {...props}
      data-testid="modalrb-body"
      className={`modal-body-container`}>

      <Title title={title} />

      <Description description={description} />

      {BodyComponentEl}

    </ModalBodyStyled>
  );
});

const ModalBodyStyled = styled(Box)(({
  theme
}: any) => {
  return {
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
    display: 'grid',
    flexDirection: 'column',
    alignItems: 'flex-start',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    borderRadius: '4px',
    padding: 24,
    background: '#FFF',
    boxShadow: '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);',
    gap: theme.spacing(3),
    width: '75%',
    maxWidth: 'inherit',
    maxHeight: '85vh',
    overflowY: 'auto',

    '& .modal-title': {
      fontSize: '20px',
      fontWeight: '700',
      lineHeight: '32px',
      textAlign: 'left'
    },

    '& .modal-description': {
      color: theme.palette.text.secondary,
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '24px',
      textAlign: 'left'
    },

    '& .button-row': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: theme.spacing(1),
    },
  }
});

const Title = ({ title }: any) => {
  if (!title) {
    return null;
  }

  return <div className="modal-title">{title}</div>;
};

const Description = ({ description }: any) => {
  if (!description) {
    return null;
  }

  return <div className="modal-description">{description}</div>;
};

const DefaultActionComponent = ({
  onClick = () => { }
}: {
  onClick?: () => void;
}) => {
  return (
    <ButtonRB onClick={onClick} disableFocusRipple={true}>
      Open Modal
    </ButtonRB>
  );
};

export const DefaultBodyComponent = ({
  closeModal = () => { }
}: {
  closeModal?: () => void;
}) => {
  return (
    <div>
      <div className="button-row">
        <ButtonRB variant="text" onClick={closeModal}>
          Close Modal
        </ButtonRB>
      </div>
    </div>
  );
};

export interface ModalRBProps {
  /**
   * Component that will open Modal on click
   * An onClick() function is injected into this component
   */
  ActionComponent?: any;
  /**
   * Component that Display inside an Open Modal
   * INJECTS dependancies
   *   closeModal(): function is injected into this component
   */
  BodyComponent?: any;
  /**
   * Title verbiage
   */
  title?: string;
  /**
   * Description verbiage
   */
  description?: string;
  /**
   * Closes the parent popover when Modal closes
   */
  closePopover?: () => void;
  /**
   * Prevent closing the modal on backdrop click
   */
  disableBackdropClick?: boolean;
  /**
   * Override internal open/close behavior
   */
  open?: boolean;
  /**
   * CSS custom styling
   */
  sx?: Object
}
