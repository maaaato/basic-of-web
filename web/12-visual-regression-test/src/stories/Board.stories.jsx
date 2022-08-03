import React from 'react';

import { Board } from '../components/Board'

export default {
  title: 'Add/Board',
  component: Board,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em'}}>
        <Story />
        </div>
    )
  ]
};

const Template = (args) => <Board {...args} />;

export const Init = Template.bind({});
Init.args = {
  squares: Array(9).fill(null),
};

export const Triangle = Template.bind({});
Triangle.args = {
  squares: Array(9).fill('△'),
};
