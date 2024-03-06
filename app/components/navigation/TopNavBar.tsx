"use client";

import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { NavigationAction } from "./NavigationMenu";
import { Action } from "./Action";

export const TopNavBar = ({
  topNavActions,
  navClickHandler,
  selectedNav,
  label,
  expandNav = () => {},
  open,
  topNavHeight,
  maxWidth,
  showMenu,
}: any) => {
  const { left, center, right } = TopBarNavigationActions({
    topNavActions,
    navClickHandler,
    selectedNav,
  });

  return (
    <AppBarStyled data-max={maxWidth} data-open={open}>
      <Toolbar
        sx={{
          height: topNavHeight,
        }}
      >
        <Box className="top-nav-left">
          <IconButton
            onClick={expandNav}
            size="large"
            edge="start"
            color="inherit"
            aria-label="Expand Left Navigation"
            sx={{
              display: open || !showMenu ? "none" : "block",
              height: 48,
            }}
          >
            <Menu
              sx={{
                marginBottom: "4px",
              }}
            />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
            }}
          >
            {label}
          </Typography>
          {left}
        </Box>

        <Box className="top-nav-center">{center}</Box>

        <Box className="top-nav-right">{right}</Box>
      </Toolbar>
    </AppBarStyled>
  );
};

const TopBarNavigationActions = ({
  topNavActions = [],
  navClickHandler = () => {},
  selectedNav,
}: TopNavigationListProps) => {
  const left = topNavActions.filter((n) => n.snapPosition === "left");
  const center = topNavActions.filter((n) => n.snapPosition === "center");
  const right = topNavActions.filter(
    (n) => n.snapPosition === "right" || !n.snapPosition
  );

  return {
    left: left.map((action) =>
      mapNavigationAction(action, navClickHandler, selectedNav)
    ),
    center: center.map((action) =>
      mapNavigationAction(action, navClickHandler, selectedNav)
    ),
    right: right.map((action) =>
      mapNavigationAction(action, navClickHandler, selectedNav)
    ),
  };
};

const mapNavigationAction = (
  action: NavigationAction,
  navClickHandler: Function,
  selectedNav?: NavigationAction
) => {
  return (
    <Action
      key={action.key}
      action={action}
      selectedNav={selectedNav}
      navClickHandler={navClickHandler}
    />
  );
};

const AppBarStyled = styled(AppBar)(({ theme, ...props }: any) => {
  const open = props["data-open"];
  const max = props["data-max"];

  return {
    width: open ? `calc(100% - ${max}px)` : "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    ".top-nav-left": {
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      gap: theme.spacing(1.5),
    },
    ".top-nav-center": {
      display: "flex",
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing(1.5),
    },
    ".top-nav-right": {
      display: "flex",
      flexGrow: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      gap: theme.spacing(1.5),
    },
  };
});

interface TopNavigationListProps {
  topNavActions: Array<NavigationAction>;
  navClickHandler: Function;
  selectedNav?: NavigationAction;
  isAuthorized?: boolean;
}
