/** @type {import('jest').Config} */

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

const config = {
	verbose: true,
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	moduleNameMapper: {
		"lucide-react": require.resolve("lucide-react"),
		...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	transformIgnorePatterns: [
		"/node_modules/(?!lucide-react)/", // Don't ignore `lucide-react`
	],
};

module.exports = config;
