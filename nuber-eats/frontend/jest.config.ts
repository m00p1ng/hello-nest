export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  collectCoverageFrom: [
    "./src/components/**/*.tsx",
    "./src/pages/**/*.tsx",
    "./src/routers/**/*.tsx"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.ts",
  ],
}