import React from 'react';

import { Square } from '../components/Square'

export default {
  title: 'Add/Square',
  component: Square,
};

const Template = (args) => <Square {...args} />;

export const Init = Template.bind({});
Init.args = {
  className: "square",
};

export const Border = Template.bind({});
Border.args = {
  className: "square-more-border",
};