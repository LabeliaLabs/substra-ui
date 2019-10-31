# Substra-ui

A shared UI components library for the Substra project.

## Storybook

We use [Storybook](https://storybook.js.org/) for component development and testing:

```sh
$ yarn storybook
```

## Development setup

Follow these steps to bypass the package repository and link together the local versions of `substra-ui` and `substrafront`.

In the `substra-ui` directory:

```sh
$ yarn link
```

In the `substrafront` directory:

```sh
$ yarn link "@substrafoundation/substra-ui"
$ yarn workspace ssr-package link "@substrafoundation/substra-ui"
```

Then you'll need to make your WIP content available to substrafront by either:
* editing `package.json` in the `substra-ui` directory, changing `"module": "es/index.js",` into `"main": "src/index.js",`
* or running `yarn build:es --watch` in the `substra-ui` directory
