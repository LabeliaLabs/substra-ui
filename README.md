# Substra-ui

A shared UI components library for the Substra project.

## Testing setup

Before writing your tests, you may want to include the components in a test page. The demo app was made just for that. You can launch it using:

```sh
$ yarn start:dev 
```

## Development setup

Follow these steps to bypass the package repository and link together the local versions of `substra-ui` and `substrafront`.

In the `substra-ui` directory: 

```sh
$ yarn link
```

In the `substrafront` directory:

```sh
$ yarn link "substra-ui"
$ yarn workspace ssr-package link "substra-ui"  
```

Edit `package.json` in the `substra-ui` directory, change `"main": "dist/index.js",` into `"main": "src/index.js",`
