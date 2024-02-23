import React from "react";
import { Box } from "@mui/material";
import { TopNavBar } from "./TopNavBar";
import { LeftNavDrawer } from "./LeftNavDrawer";
import { filterNavigationActions } from "./navigation.util";
import { styled } from "@mui/material/styles";

export const NavigationMenu = ({
  label,
  navigationActions = [],
  navigationClick = () => {},
  topNavHeight = 64,
  leftNavMinWidth = 64,
  leftNavMaxWidth = 240,
  isAuthorized,
  children,
}: NavigationMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedNav, setSelectedNav]: any = React.useState();

  const expandNav = () => setOpen(true);
  const collapseNav = () => setOpen(false);

  const navClickHandler = (action: NavigationAction) => {
    setSelectedNav(action);
    navigationClick(action);
  };

  const { topNavActions, leftNavActions, leftNavCount } = getNavigationActions(
    navigationActions,
    isAuthorized
  );

  const baseClassNames = ["base-application"];
  baseClassNames.push(open ? "expanded" : "contracted");
  baseClassNames.push(isAuthorized ? "authorized" : "unauthorized");

  return (
    <LayoutBaseStyled
      className={baseClassNames.join(" ")}
      data-testid={isAuthorized ? "authorized" : "unauthorized"}
      sx={{
        display: "flex",
        flexGrow: 1,
      }}
      aria-label="Base application"
    >
      <TopNavBar
        isAuthorized={isAuthorized}
        topNavActions={topNavActions}
        navClickHandler={navClickHandler}
        selectedNav={selectedNav}
        label={label}
        expandNav={expandNav}
        open={open}
        showMenu={!!leftNavCount}
        topNavHeight={topNavHeight}
        maxWidth={leftNavMaxWidth}
      />

      <LeftNavDrawer
        isAuthorized={isAuthorized}
        leftNavigationActions={leftNavActions}
        leftNavigationClick={navClickHandler}
        selectedNav={selectedNav}
        open={open}
        showDrawer={!!leftNavCount}
        collapseNav={collapseNav}
        minWidth={leftNavMinWidth}
        maxWidth={leftNavMaxWidth}
        topNavHeight={topNavHeight}
      />

      <Box
        className={"base-page-container"}
        sx={{
          marginTop: `${topNavHeight}px`,
          marginLeft: open ? `${leftNavMaxWidth}px` : `${leftNavMinWidth}px`,
          width: "100%",
          height: "100%",
          padding: "24px",
        }}
      >
        {children}
      </Box>
    </LayoutBaseStyled>
  );
};

const getNavigationActions = (
  navigationActions: Array<NavigationAction>,
  isAuthorized: boolean
) => {
  const topNavActions = navigationActions
    .filter((a: NavigationAction) => a.position === "top")
    .filter((a: NavigationAction) => {
      return filterNavigationActions({
        action: a,
        isAuthorized,
      });
    });

  const leftNavActions = navigationActions
    .filter((a: NavigationAction) => a.position !== "top")
    .filter((a: NavigationAction) => {
      return filterNavigationActions({
        action: a,
        isAuthorized,
      });
    });

  return {
    topNavActions,
    leftNavActions,
    // Filter any dividers
    leftNavCount: leftNavActions.filter((a: NavigationAction) => !a.divider)
      .length,
  };
};

const LayoutBaseStyled = styled(Box)(({ theme }: any) => {
  return {
    display: "flex",
    flexGrow: 1,

    "&.unauthorized .base-page-container": {
      marginLeft: 0,
    },
  };
});

interface NavigationMenuProps {
  /**
     Title of application
   */
  label?: string;
  /**
   * List of all navigation actions in left navigation and app bar
   */
  navigationActions?: Array<NavigationAction>;
  /**
   * Current user authorized status
   */
  isAuthorized: boolean;
  /**
   * Event when navigation is clicked, returns navigation item
   */
  navigationClick?: Function;
  /**
   * Top navigation bar height
   */
  topNavHeight?: number;
  /**
   * Left navigation drawer collapsed width
   */
  leftNavMinWidth?: number;
  /**
   * Left navigation drawer expanded width
   */
  leftNavMaxWidth?: number;
  /**
   * All child elements
   */
  children?: any;
}

export interface NavigationAction {
  key?: string;
  /**
   * Display actions on authorization state
   * always: Always show regardless of auth status
   * authorized: Only show when user is authorized
   * unauthorized: Only show when user is not authorized
   */
  authFilter: "always" | "authorized" | "unauthorized";
  /**
   * Display text to the user
   */
  label?: string;
  /**
   * Aria text
   */
  ariaLabel?: string;
  /**
   * After navigation action is clicked, will run this function
   */
  onClick?: Function;
  /**
   * MUI Icon to display
   */
  icon?: React.ReactElement | null;
  /**
   * Display a divider in navigation
   */
  divider?: Boolean;
  /**
   * Path to redirect to on nav click
   */
  path?: string;
  /**
   * Define which navigation area to display the action
   * left: Left navigation drawer
   * top: Top app navigation
   */
  position: "left" | "top";
  /**
   * Render custom nav component
   */
  Component?: React.ReactElement | null;
  /**
   * Snap custom component to position in app bar
   */
  snapPosition?: "left" | "center" | "right";
  /**
   * Nested Navigation Popover Actions
   * All actions will be listed beneath
   * as options within a Popover on click
   */
  popoverActions?: Array<PopoverNavigationActionProps>;
  /**
   * Displays a Modal on click with this component as Body
   */
  ModalBody?: React.ReactElement;
}

export interface PopoverNavigationActionProps
  extends Omit<NavigationAction, "position" | "authFilter"> {}
