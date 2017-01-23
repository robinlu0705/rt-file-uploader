# Development
    .
    ├── dist/                  # Distribution files
    ├── example/               # An usage example
    ├── src/                   # Source files
    ├── .babelrc               # Config of babel
    ├── .eslintrc              # Config of eslint
    └── webpack.config.js      # Config of webpack


## Dependencies
Install all the node modules needed:
```
npm install
```


## Building
For development building, which generates `dist/rt_file_uploader.js` and `dist/rt_file_uploader.js.map`:
```
npm run build-dev
```

For production building, which genarates `dist/rt_file_uploader.min.js`:
```
npm run build-prod
```

`build-prod` and `build-dev` will also introduce a post-build stage, `src/rt_file_uploader.less` will be copied to `dist/`, and then all files in `dist/` will be copied to `example/`.


## Linting
```
npm run lint
```

## Publishing
This will run `npm run lint`, `npm run build-dev` and `npm run build-prod` at once:
```
npm run publish
```

**PLEASE DO** run `publish` before `git commit`.


## Implementation Details
The source files in `src/` can be categorized into 4 groups:
* Module entry
    * entry.js
* UI components
    * App.js
    * Gallery.js
    * ThumbnailViewer.js
    * ToolBar.js
* Data flow
    * Reducers.js
    * Actions.js
* Utilities
    * FpUtils.js
    * StoreUtils.js
    * Utils.js


#### Module entry
The entry creates the namespace `window.RT.FileUploader`.

Under the namespace, there are an api `gen`, and a constant set `FILE_STATUS`.


#### UI components
Each component exports the `gen` interface for constructing.

Each component listens to a number of particular parts of the app state, and defines the rendering functions in response to the change of state.


#### Data flow
`Actions.js` contains functions generating action objects, each action object describes some event happening in the app.

`Reducers.js` contains functions defining the changes of app state in response to actions.

Unidirectional data flow:
1. The initial app state is constructed by reducers once.
2. Some action is dispatched.
3. Action object is sent to reducers.
4. Reducers updates the app state.
5. UI components re-render.

Basically, it is a *not-so-well* re-implementation of Redux. The official website of Redux provides excellent guidelines that I strongly recommend you to check out. [Redux Official Website](http://redux.js.org/)

#### Utilities
* `FpUtils.js` - provides 2 functions `compose` and `curryIt` in favor of functional programming
* `StoreUtils.js` - provides a function `createStore` for creation of app state
* `Utils.js` - provides some general utilities
