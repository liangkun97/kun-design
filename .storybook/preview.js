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
