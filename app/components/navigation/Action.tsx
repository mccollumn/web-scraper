import React from "react";
import {
  IconButton,
  Tooltip,
  Box,
  ButtonBase,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  NavigationAction,
  PopoverNavigationActionProps,
} from "./NavigationMenu";
import { PopoverRB } from "../popover/PopoverRB";
import { ModalRB } from "../modal/ModalRB";
import _ from "lodash";

/**
 * Standard Navigation Button/Icon
 */
export const Action = ({
  action,
  navClickHandler,
  selectedNav,
}: ActionProps) => {
  if (action.Component) {
    return React.cloneElement(action.Component, { key: action.key });
  }

  if (action.divider) {
    return <Divider />;
  }

  const clickHandler = () => navClickHandler(action);

  // Action will open a popover on click
  if (action.popoverActions) {
    return (
      <PopoverRB
        ActionComponent={
          <NavAction action={action} selectedNav={selectedNav} />
        }
      >
        <PopoverContent
          action={action}
          navClickHandler={navClickHandler}
          selectedNav={selectedNav}
        />
      </PopoverRB>
    );
  }

  if (action.ModalBody) {
    return (
      <ModalRB
        ActionComponent={
          <NavAction action={action} selectedNav={selectedNav} />
        }
        BodyComponent={action.ModalBody}
      />
    );
  }

  return (
    <NavAction
      action={action}
      selectedNav={selectedNav}
      onClick={clickHandler}
    />
  );
};

/**
 * Standard Navigation Action for App Bar and Drawer
 */
const NavAction = ({ action, selectedNav, onClick }: any) => {
  const selected = _.isEqual(action, selectedNav);

  // Left Drawer Navigation Item
  if (action.position === "left") {
    return (
      <ListItemButton
        selected={selected}
        aria-label={action.ariaLabel}
        onClick={onClick}
      >
        <Tooltip title={action.label || ""}>
          <ListItemIcon>{action.icon}</ListItemIcon>
        </Tooltip>
        <ListItemText>{action.label}</ListItemText>
      </ListItemButton>
    );
  }

  return (
    <Tooltip key={action.key} title={action.label || ""}>
      <IconButton
        color={selected ? "default" : "inherit"}
        key={action.key}
        onClick={onClick}
        aria-label={action.ariaLabel}
      >
        {action.icon}
      </IconButton>
    </Tooltip>
  );
};

const NavPopoverMenuItem = ({
  popoverAction,
  selectedNav,
  navClickHandler = () => {},
  closePopover = () => {},
}: NavPopoverMenuItemProps) => {
  const baseClass = ["nav-popover-menu-item"];

  const clickHandler = () => {
    navClickHandler(popoverAction);
    closePopover();
  };

  if (selectedNav === popoverAction) {
    baseClass.push("item-selected");
  }

  return (
    <NavPopoverMenuItemStyled
      className={baseClass.join(" ")}
      onClick={clickHandler}
    >
      <Box className={"nav-menu-icon"}>{popoverAction.icon}</Box>

      <Typography variant={"subtitle1"} className="nav-menu-label">
        {popoverAction.label}
      </Typography>
    </NavPopoverMenuItemStyled>
  );
};

const PopoverContent = ({
  action,
  navClickHandler = () => {},
  selectedNav,
  closePopover,
}: any) => {
  return action.popoverActions.map(
    (p: PopoverNavigationActionProps, idx: number) => {
      return (
        <NavPopoverMenuItem
          key={idx}
          popoverAction={p}
          navClickHandler={navClickHandler}
          selectedNav={selectedNav}
          closePopover={closePopover}
        />
      );
    }
  );
};

const NavPopoverMenuItemStyled = styled(ButtonBase)(({ theme }: any) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(1.5),
    gap: theme.spacing(1.5),
    height: theme.spacing(5),

    "&.item-selected": {
      background: theme.palette.action.selected,
    },

    ".nav-menu-label": {
      whiteSpace: "nowrap",
    },
  };
});

export interface ActionProps {
  /**
   * Navigation action properties
   * Displays navigation button/icon to user
   */
  action: NavigationAction;
  /**
   * Current selected navigation action
   */
  selectedNav?: NavigationAction;
  /**
   * When user clicks a navigation item
   */
  navClickHandler: Function;
}

export interface NavPopoverMenuItemProps {
  /**
   * Navigation action properties
   * Displays navigation button/icon to user
   */
  popoverAction: PopoverNavigationActionProps;
  /**
   * Current selected navigation action
   */
  selectedNav?: NavigationAction;
  /**
   * Handle click for navigation
   */
  navClickHandler: any;
  /**
   * Click handler passed in from parent, or injected from popover/modal
   */
  closePopover?: any;
}
