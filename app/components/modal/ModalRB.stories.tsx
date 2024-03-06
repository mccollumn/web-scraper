import {
  ComponentStory, ComponentMeta
} from '@storybook/react';
import { ModalRB } from './ModalRB';

export default {
  title: 'Modal',
  component: ModalRB,
} as ComponentMeta<typeof ModalRB>;

const Template: ComponentStory<typeof ModalRB> = (args) => <ModalRB {...args} />;

export const SimpleModal = Template.bind({});
SimpleModal.args = {
  title: 'Sample Modal',
  description: 'Body component gets injected with a closeModal() function'
}
