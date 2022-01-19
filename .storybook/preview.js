import { themes } from '@storybook/theming';
import kunDesignTheme from "./kunDesignTheme";

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
  docs: {
    theme: kunDesignTheme,
  },
}
