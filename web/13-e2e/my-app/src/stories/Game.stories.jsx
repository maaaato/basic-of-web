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
Init.args = {
  history: [{squares:Array(9).fill(null)}]
};

export const Draw = Template.bind({});
const drawLines = [
  {
    squares: Array(9).fill(null),
  },
  {
    squares: ["X",null,null,null,null,null,null,null,null]
  },
  {
    squares: ["X","○",null,null,null,null,null,null,null]
  },
  {
    squares: ["X","○","X",null,null,null,null,null,null]
  },
  {
    squares: ["X","○","X", null, null, "X",null,null,null]
  },
  {
    squares: ["X","○","X", null, null, "X", null, null, "○"]
  },
  {
    squares: ["X","○","X", "X", null, "X", null, null, "○"]
  },
  {
    squares: ["X","○","X", "X", null, "X", "○", null, "○"]
  },
  {
    squares: ["X","○","X", "X", "○", "X", "○", null, "○"]
  },
  {
    squares: ["X","○","X", "X", "○", "X", "○", "X", "○"]
  },
];

Draw.args = {
  history: drawLines
};
