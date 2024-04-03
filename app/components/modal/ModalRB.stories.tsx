import {
  StoryObj, Meta
} from '@storybook/react';
import { ModalRB } from './ModalRB';

const meta ={
  title: 'Modal',
  component: ModalRB,
} satisfies Meta<typeof meta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleModal: Story = {
  args: {
    title: 'Sample Modal',
    description: 'Body component gets injected with a closeModal() function'
  }
};
