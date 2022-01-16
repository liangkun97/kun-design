import React from "react";
import { GlobalStyle } from "../src/shared/global";
import { configure } from '@storybook/react';

// 排列目录的顺序
const loaderFn = () => {
	const allExports = [
		require('../src/stories/Introduction.stories.mdx'),
	];
	return allExports;
};

configure(loaderFn, module);

export const parameters = {
  actions: {
    argTypesRegex: "^on[A-Z].*",
    showRoots: true
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  dependencies: {
    withStoriesonly: true,
    hideEmpty: true
  },
}