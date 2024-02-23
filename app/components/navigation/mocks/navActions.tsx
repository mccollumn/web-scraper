import {
  Person,
  Notifications,
  Settings,
  Assessment,
  Apps,
  Logout,
  ManageAccounts,
} from "@mui/icons-material";
import { NavigationAction } from "../NavigationMenu";
import SearchInput from "../../form/SearchInput";
import { Login } from "../../../pages/login/Login";

export const mockNavActions: Array<NavigationAction> = [
  {
    key: "Search",
    label: "Search",
    icon: <Apps />,
    ariaLabel: "Search",
    authFilter: "authorized",
    position: "top",
    Component: (
      <SearchInput
        onChange={(value: any) => {
          console.log(value);
        }}
        variant={"outlined"}
        margin={"none"}
        sx={{ "& .MuiInputBase-root": { backgroundColor: "white" } }}
      />
    ),
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
    icon: <Notifications />,
    ariaLabel: "Notifications",
    authFilter: "authorized",
    position: "top",
  },
  {
    key: "Settings",
    label: "Settings",
    icon: <Settings />,
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
    popoverActions: [
      {
        key: "ACCOUNT_SETTINGS",
        label: "Account Settings",
        icon: <ManageAccounts />,
        ariaLabel: "Account Settings",
      },
      {
        key: "LOGOUT",
        label: "Logout",
        icon: <Logout />,
        ariaLabel: "Logout",
      },
    ],
  },
  {
    key: "Login",
    label: "Login",
    icon: <Person />,
    ariaLabel: "Login",
    authFilter: "unauthorized",
    position: "top",
    // Display a Modal on Click
    ModalBody: <Login onLoginSubmit={(values: any) => console.info(values)} />,
  },
];
