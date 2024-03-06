import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PopoverRB } from './PopoverRB';
import { ButtonRB } from '../button/ButtonRB';

export default {
  title: 'Popover',
  component: PopoverRB,
  decorators: [
    // Wrap in Form context if name is set
    (Story) => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80px'
          }}
          className="button-bar">

          {Story()}

        </div>
      )
    }
  ],
  argTypes: {
    anchorVertical: {
      control: { type: 'radio' },
      options: ['top', 'center', 'bottom'],
      defaultValue: 'bottom'
    },
    anchorHorizontal: {
      control: { type: 'radio' },
      options: ['left', 'center', 'right'],
      defaultValue: 'left'
    },
    transformVertical: {
      control: { type: 'radio' },
      options: ['top', 'center', 'bottom'],
      defaultValue: 'top'
    },
    transformHorizontal: {
      control: { type: 'radio' },
      options: ['left', 'center', 'right'],
      defaultValue: 'center'
    },
  }
} as ComponentMeta<typeof PopoverRB>;

const Template: ComponentStory<typeof PopoverRB> = (args) => <PopoverRB {...args} />;

export const SimplePopover = Template.bind({});
SimplePopover.args = {
  children: (
    [
      <PopoverButton key="1" label='Edit' />,
      <PopoverButton key="2" label='Delete' />,
      <PopoverButton key="3" label='View' />,
    ]
  )
}

function PopoverButton ({
  label
}: any) {
  return (
    <div>{label}</div>
  )
}

export const PopOverDifferentAnchorElement = ({

}) => {

  const AnchorRef = React.useRef<HTMLDivElement>(null);

  const AnchorElement = () => (
    <div
      ref={AnchorRef}
      style={{
        position: 'absolute',
        top: 0
      }}>
      I am different anchor
    </div>
  );

  return (
    <>
      <PopoverRB
        anchorRef={AnchorRef}
        ActionComponent={<ButtonRB>Click For Popover</ButtonRB>}>

        <UserMenu />

        <UserMenu />

      </PopoverRB>

      <br />

      <br />

      <br />

      <br />

      {AnchorElement()}

    </>
  );
};

const UserMenu = ({}) => {
  return (
    <div>
      Hello
    </div>
  );
};
