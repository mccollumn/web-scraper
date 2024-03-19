import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { ButtonRB, ButtonRBProps } from "./ButtonRB";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "New Button",
  component: ButtonRB,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ButtonRB>;

export default meta;
type Story = StoryObj<typeof meta>;

// const Template: StoryObj<typeof ButtonRB> = (args) => <ButtonRB {...args} />;

// export const Default = Template.bind({});

export const Primary: Story = {
  args: {},
};
