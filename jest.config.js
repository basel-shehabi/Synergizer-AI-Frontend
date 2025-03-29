export default {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '.(css|less|scss)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-toastify|react-markdown|devlop|firebase)/",
  ]
};