![Build status on master](https://travis-ci.org/ucorina/react-styling-overview.svg?branch=master)


# React component styling libraries overview

See it live at: https://ucorina.github.io/react-styling-overview/

Contains a list of component styling libraries with live information for each regarding:
* number of downloads from NPM
* number of stargazers on Github
* date created

Aims to make it easier to see how popular each library is, how many projects use it.

The list of libraries is inspired from https://github.com/MicheleBertoli/css-in-js.

### Run locally

To start locally, just run:

```
yarn start
```

The list of libraries to show is defined manually in `src\data\libraries.json`.
The information for each is retrieved by querying the NPM registry API and Github API at runtime.
