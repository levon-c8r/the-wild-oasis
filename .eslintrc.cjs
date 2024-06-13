module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'react-app'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', "node_modules/", "build/"],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh', "react"],
  rules: {
    "react/prop-types": 0,
    "import/no-anonymous-default-export": "off",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-fragments": ["error", "element"],
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "ignore" },
    ],
    "import/order": [
      1,
      {
        groups: ["builtin", "external", "sibling", "parent", "index"],
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.sb.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
}

