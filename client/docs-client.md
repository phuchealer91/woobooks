This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install TailwindCss

##### yarn add -D tailwindcss postcss-cli postcss autoprefixer@^9.8.6

##### npx tailwind init tailwind.js --full

##### touch postcss.config.js

```
  const tailwindcss = require('tailwindcss')

  module.exports = {
    plugins: [
      tailwindcss('./tailwind.js'),
      require('autoprefixer')
    ]
  }
```

#### src/assets/styles

```
- tailwind.css
```

@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

```
- main.css
```

#### package.json

```
  "scripts": {
     "start": "yarn watch:css && react-scripts start",
      "build": "yarn build:css && react-scripts build",
    "build:css": "postcss src/assets/styles/tailwind.css -o src/assets/styles/main.css"
    "watch:css": "postcss src/assets/styles/tailwind.css -o src/assets/styles/main.css"
  }
```

#### PDF VIEWER

```
  yarn add @react-pdf/renderer
  yarn add @david.kucsai/react-pdf-table
```
