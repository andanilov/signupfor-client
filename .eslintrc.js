module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        // "eslint:recommended",
        // "plugin:react/recommended",
        // "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "settings": {
        "import/resolver": {
          "node": {
            "paths": ["src"],
            "extensions": [".js", ".jsx", ".ts", ".tsx"],
          }
        },
    },
    "rules": {
        "linebreak-style": 0,
        "import/no-unresolved": 0,
        "react/jsx-filename-extension": 0,
        "import/extensions": 0,
        "no-shadow": 0,
        "no-shadow": 0,
        "no-unused-vars": 0,
        "react/function-component-definition": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "react/require-default-props": 0,
        "no-bitwise": 0,
        "no-unused-expressions": 0,
        "no-param-reassign": 0,
        "react-hooks/exhaustive-deps": 0,
        "react/jsx-props-no-spreading": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "react/button-has-type": 0,
        "react/jsx-no-useless-fragment": 0,
        "import/prefer-default-export": 0,
        "max-len": 0,
        "import/no-cycle": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-no-constructed-context-values": 0,
        "consistent-return": 0,
        "no-use-before-define": 0,
        "lines-between-class-members": 0,
        "class-methods-use-this": 0,
        "no-underscore-dangle": 0,
        "no-return-assign": 0,
    }
}
