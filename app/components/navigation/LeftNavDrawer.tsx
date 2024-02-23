import { ChevronLeft } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  Divider,
  IconButton,
  Collapse,
} from "@mui/material";
import { NavigationAction } from "./NavigationMenu";
import { filterNavigationActions } from "./navigation.util";
import { Action } from "./Action";

export const LeftNavDrawer = ({
  leftNavigationActions = [],
  leftNavigationClick,
  collapseNav = () => {},
  selectedNav,
  open,
  minWidth,
  maxWidth,
  topNavHeight,
  isAuthorized,
  showDrawer,
  children,
}: any) => {
  return (
    <Drawer
      anchor="left"
      aria-label="Navigation drawer"
      variant={"permanent"}
      sx={{
        zIndex: 0,
        display: !showDrawer ? "none" : "flex",
        overflowY: "hidden",
      }}
    >
      <Collapse
        sx={{
          width: minWidth,
        }}
        orientation="horizontal"
        in={open}
        collapsedSize={minWidth}
      >
        <Box
          sx={{
            height: topNavHeight,
            width: maxWidth,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={collapseNav}
            size="large"
            edge="start"
            color="inherit"
            aria-label="Collapse Left Navigation"
            sx={{
              height: 48,
            }}
          >
            <ChevronLeft />
          </IconButton>
        </Box>

        <Divider />

        <List
          className="ListContainer"
          sx={{
            overflowX: "hidden",
          }}
          aria-label="Navigation list"
        >
          <NavigationList
            navigationActions={leftNavigationActions}
            navigationClick={leftNavigationClick}
            selectedNav={selectedNav}
            isAuthorized={isAuthorized}
          />
        </List>
        {children}
      </Collapse>
    </Drawer>
  );
};

const NavigationList = ({
  navigationActions = [],
  navigationClick = () => {},
  selectedNav,
  isAuthorized,
}: NavigationListProps): any => {
  return navigationActions
    .filter((a: NavigationAction) => {
      return filterNavigationActions({
        action: a,
        isAuthorized,
      });
    })
    .map((action, index) => {
      return (
        <Action
          key={index}
          action={action}
          selectedNav={selectedNav}
          navClickHandler={navigationClick}
        />
      );
    });
};

interface NavigationListProps {
  navigationActions: Array<NavigationAction>;
  navigationClick: Function;
  selectedNav: NavigationAction;
  isAuthorized: boolean;
}
