module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',

  // https://www.npmjs.com/package/jest-extended#setup
  "setupFilesAfterEnv": [ "jest-extended/all" /*, './test/jest.setup.js' */ ],
}
