# The Elder Scrolls: Legends API Demo

A small Express/React application that consumes The Elder Scrolls: Legends API.

[Website](https://secret-waters-37121.herokuapp.com/)

## Technologies used

* [React](https://reactjs.org/) &mdash; UI library
* [Yarn](https://yarnpkg.com/) &mdash; For package management
* [create-react-app](https://github.com/facebook/create-react-app) &mdash; For bootstrapping a new React-based project - automatically sets up Webpack, Babel, Jest, and npm scripts
* [Webpack](https://webpack.js.org/) &mdash; For bundling and building assets
* [Babel](https://babeljs.io/) &mdash; For transpiling modern ES6+ into browser-compatible JavaScript
* [Jest](https://jestjs.io/) &mdash; For testing
* [Redux](https://redux.js.org/) &mdash; For managing state
* [Express](https://expressjs.com/) &mdash; Web server
* [Heroku](https://www.heroku.com/) &mdash; Cloud platform for hosting the application

## Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Building and running the application

### Install dependencies

```bash
cd server
yarn
cd ../client
yarn
```

### Run the application from the client folder

```bash
cd client
yarn start
```

A new browser tab will automatically open.
This method uses a proxy to run alongside the Express server. Use this for development to take advantage of live reloading.

### Build for production

```bash
cd client
yarn build
```

This will automatically copy the built assets to the server directory.

### Run the application from the server folder

```bash
cd server
node index.js
```

Browse to `http://localhost:3001`.

## Running tests

```bash
cd client
yarn test
```

## Requirements

:white_check_mark: Show results in a card grid format with the image prominently displayed.

:white_check_mark: Each card displays: Image, Name, Text, Set Name, and Type. Additional fields are optional.

:white_check_mark: Display a loading indicator when communicating with the API.

:white_check_mark: Use a responsive design that accommodates, at minimum, desktop and mobile.

:white_check_mark: Initially, fetch and display the first 20 results returned by the API.

:white_check_mark: As the user scrolls down the page, load and append additional cards using “infinite scroll.”

:white_check_mark: Retrieve additional pages of results as-needed but do not load more than 20 cards with each request.

:white_check_mark: Allow the user to search for cards by Name.

:white_check_mark: Use modern open-source web technologies to implement your solution (React, Backbone, Angular, Vue, Underscore, etc.).

:white_check_mark: Provide instructions for prerequisites, installation, and application setup and build in a README file.

### Things to look for

:white_check_mark: Search input is url encoded before it is sent in requests.

:white_check_mark: All card images are lazy-loaded.

:white_check_mark: Empty search results are handled correctly.

:white_check_mark: There is a link to clear search results when searching by name.

:white_check_mark: A scroll-to-top button is included for usabiltiy when scrolling deep into search results.

## Design decisions

### Use create-react-app to bootstrap the project

Create-react-app handled setting up tooling such as Webpack and Babel, as well as providing scripts for starting the application and building production assets.

### Proxy requests to TES:L's API

Proxying requests to TES:L's API was necessary to avoid violating the same-origin policy. First, I set up a route in my Express server that mimics the structure of TES:L's card endpoint. Then, the React UI makes requests to `/api/cards` instead of going to TES:L's API directly. The server handles making requests to their API and returns the results of the searches to the UI after mapping over the payload data that we care about in our UI.

### Use Redux for state management

React's hooks have made it possible to use Redux-like features without using Redux &mdash; `useState` and `useReducer` offer good solutions for simple to semi-complex state. Ultimately, I decided to use Redux because of the organization it encourages, and it was a good opportunity to learn some of the new features that have been introduced since I last used it, including the `useDispatch` and `useSelector` hooks in `react-redux`. Plus, I thought it would look good to show off that I know how to set up and use Redux. :blush:

### Use Pure.css for basic form field styling

[Pure](https://purecss.io/) was something I found while looking for CSS to style my form fields. It's really lightweight, and it made the search textbox and buttons look great, quickly.

### Use flexbox for styling the card layout

Flexbox is a great way to powerfully and easily style elements in a grid or list. It's especially great for easily enabling responsive design. Notice how cards rearrange as you resize the browser window.

### Use testing-library/react to support writing unit tests

I usually use Enzyme, but [React Testing Library](https://github.com/testing-library/react-testing-library) came with create-react-app so I thought I would give it a try. It really does help with focusing on writing tests that don't dip as heavily into implementation details.
