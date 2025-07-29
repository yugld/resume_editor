import { defineConfig } from "eslint-define-config";

const eslintRecommended = {
    rules: {},
};

const prettierConfig = {
    rules: {},
};

export default defineConfig([
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
        },
        plugins: {},
        rules: {},
    },
    eslintRecommended,
    prettierConfig,
]);
