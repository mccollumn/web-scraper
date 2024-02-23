import {
  Person,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Assessment,
  Apps,
  Logout,
  ManageAccounts,
} from "@mui/icons-material";

export const navigationActions: Array<NavigationAction> = [
  {
    key: "Search",
    label: "Search",
    icon: <Apps />,
    ariaLabel: "Search",
    authFilter: "authorized",
    position: "top",
    //   Component: (
    //     <SearchInput
    //       onChange={(value: any) => {
    //         console.log(value);
    //       }}
    //       variant={"outlined"}
    //       margin={"none"}
    //       sx={{ "& .MuiInputBase-root": { backgroundColor: "white" } }}
    //     />
    //   ),
    snapPosition: "right",
  },
  {
    key: "Profiles",
    label: "Profiles",
    icon: <Apps />,
    ariaLabel: "Profiles",
    path: "/profiles",
    authFilter: "authorized",
    position: "left",
  },
  {
    key: "Reports",
    label: "Reports",
    icon: <Assessment />,
    ariaLabel: "Reports",
    path: "/reports",
    authFilter: "authorized",
    position: "left",
  },
  {
    divider: true,
    authFilter: "always",
    position: "left",
  },
  {
    key: "Notifications",
    label: "Notifications",
    icon: <NotificationsIcon />,
    ariaLabel: "Notifications",
    authFilter: "authorized",
    position: "top",
  },
  {
    key: "Settings",
    label: "Settings",
    icon: <SettingsIcon />,
    ariaLabel: "Settings",
    authFilter: "authorized",
    position: "top",
  },
  {
    key: "Avatar",
    label: "Avatar",
    icon: <Person />,
    ariaLabel: "Avatar",
    authFilter: "authorized",
    position: "top",
    // Displays a popover menu on click
    //   popoverActions: [
    //     {
    //       key: "ACCOUNT_SETTINGS",
    //       label: "Account Settings",
    //       icon: <ManageAccounts />,
    //       ariaLabel: "Account Settings",
    //     },
    //     {
    //       key: "LOGOUT",
    //       label: "Logout",
    //       icon: <Logout />,
    //       ariaLabel: "Logout",
    //     },
    //   ]
  },
  {
    key: "Login",
    label: "Login",
    icon: <Person />,
    ariaLabel: "Login",
    authFilter: "unauthorized",
    position: "top",
    // Display a Modal on Click
    //   ModalBody: (
    //     <Login
    //       onLoginSubmit={(values: any) => console.info(values)}
    //     />
    //   ),
  },
];

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
}
