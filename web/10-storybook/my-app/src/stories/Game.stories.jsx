import React from 'react';

import { Game } from '../components/Game';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Add/Game',
  component: Game,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Game {...args} />;

export const Init = Template.bind({});
Init.args = {};
