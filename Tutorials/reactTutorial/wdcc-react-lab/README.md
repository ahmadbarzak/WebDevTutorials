# WDCC Workshop - React Lab
In this lab, we'll get practical experience with React, by putting together a simple Pokédex application.

- In the first set of exercies, we'll build some React components to represent the Pokédex. We'll start by displaying some hardcoded data, then move on to displaying the actual data contained within the provided [`pokemon.json`](./src/pokemon.json) file.

- In the second set of exercies, we'll allow our app to change its *state* in response to user input, by displaying different Pokémon data when the user clicks different elements on-screen. Then, we'll unleash our creative juices, and style our 'dex to give it a personal touch.

- In the final set of exercises, we'll use Routing to allow users to navigate directly to a desired Pokémon using the page's URL. And, we'll investigate how we can pull our Pokédex data from an external API rather than a local file.


## Installation
Before starting, you'll need to install all dependencies for the project using `npm`. To do this, open a terminal window in the project root (the same folder containing this `README.md`), and run `npm install`. Once that's done, you can run `npm run dev` to load the your app within the browser. You'll see a single `<h1>` with the text "Your app here!", as rendered from within `App.jsx`.

### What's happening here?
This project is set up using the **Vite** build tool. During development, Vite will automatically *transpile* your React code, and serve it to your browser in a format that it can understand (i.e. vanilla JavaScript). This is required, as browsers don't understand React code by themselves. If you *build* your app for deployment, Vite will also take care of optimizing your code so that it takes up the minimum amount of space - and therefore network bandwidth - as possible!

Another really cool feature of Vite and other build tools is its hot module reloading feature. This will automatically cause the browser to refresh and display the latest version of the app - or, any errors, if there are any - whenever you modify and save any file. Most of the time, you'll only need to stop the dev server running if you're done coding for the session, or if you need to install other dependencies (which we will be doing in session 3 today).


## Sessions

1. [Session One - A basic Pokédex](./spec/Session-01.md)

2. [Session Two - A prettier product](./spec/Session-02.md)

3. [Session Three - Routing and External APIs](./spec/Session-03.md)

4. [Session Four - Extensions](./spec/Session-04.md)
