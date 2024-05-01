import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  Person,
  Notifications,
  Settings,
  Assessment,
  Apps,
} from "@mui/icons-material";
import { NavigationMenu } from "./NavigationMenu";
import { navigationActions } from "./mocks/navActions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Layout",
  component: NavigationMenu,
  decorators: [
    (Story: any) => (
      <div
        style={{
          margin: "-1rem", // Offset parent storybook padding
        }}
      >
        <Story />
      </div>
    ),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    navigationActions: {
      defaultValue: navigationActions,
    },
    isAuthorized: {
      value: true,
    },
  },
} as ComponentMeta<typeof NavigationMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavigationMenu> = (args: any) => (
  <NavigationMenu {...args} />
);

export const LoggedOut = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LoggedOut.args = {
  label: "Logged Out",
  isAuthorized: false,
  children: <div>Example of logged out navigation</div>,
};

export const LoggedIn = () => {
  const [action, setAction] = React.useState();
  const clickHandler = (navAction: any) => {
    setAction(navAction);
  };

  return (
    <NavigationMenu
      label={"Logged In"}
      navigationActions={navigationActions}
      navigationClick={clickHandler}
      isAuthorized={true}
    >
      <DisplaySelectedAction action={action} />
    </NavigationMenu>
  );
};

const DisplaySelectedAction = ({ action }: any) => {
  return <div>{action?.label}</div>;
};
