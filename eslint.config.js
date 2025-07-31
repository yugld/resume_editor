import js from "@eslint/js";
import globals from "globals";
import eslintPluginPrettier from "eslint-plugin-prettier";

const prettierOptions = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
};

export default [
    {
        ignores: ["dist"],
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {},
    },
    {
        ...js.configs.recommended,
    },
    {
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            "prettier/prettier": ["error", prettierOptions],
        },
    },
];
