/** @type {import('jest').Config} */
export const config = {
  verbose: true,
  clearMocks: true,
  testEnvironment: 'node',
  testRegex: "((\\.|/*.)(test))\\.js?$",
  coverageDirectory: "dist/coverage",
  coverageProvider: "v8",
  transform: {},
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};

export default config;
