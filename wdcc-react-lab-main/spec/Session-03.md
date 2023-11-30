## Session Three - Routing and external APIs
In this final session, we'll use Routing to allow users to navigate directly to a desired Pokémon using the page's URL. And, we'll investigate how we can pull our Pokédex data from an external API rather than a local file. We'll look at how we can render different UI elements depending on whether or not there are any errors, and / or whether data is still loading from our external source.

### 3A) Getting Ready for Routing
In this exercise, we'll use React Router 6 to enable us to browse to specific Pokémon based on their `dexNumber`. For example, when we browse to <http://localhost:5173/1>, Bulbasaur's data will be shown.

Firstly, we need to install React Router:

```sh
npm install react-router-dom
```

Next, within `main.jsx`, surround our `<App />` in a `<BrowserRouter>`, to enable routing:

```jsx
<React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</React.StrictMode>
```

**Note:** The `BrowserRouter` component, and all other React Router components, should be `import`ed from the `react-router-dom` package when required. For example, you would add the following line to the top of `main.jsx`:

```js
import { BrowserRouter } from 'react-router-dom';
```

Next, we'll refactor our app slightly. Move everything currently within `App.jsx` into a new compoment, called `MainPage`. Simply render that compoment within `App.jsx` for now, to check everything still works. We have done this because we want to use `App.jsx` exclusively to handle our routing logic, which we will add later on.

### 3B) Routing
Now, we'll start to implement our routes. First, have `App.jsx` return a `Routes` compoment *(remember to import it!)*. That component should have a single child - a `Route` component *(also needs importing)* - whose `path` is `/` (i.e. the root), and which will render the `MainPage` as its `element`.

Within that `Route`, we should define a child route, whose `path` is `:dexNumber`. Paths with colons (**:**) are *path params*, and we can access their values within those paths' `element`s. This child route's element should be our `PokemonDetail` component.

```jsx
<Routes>
    <Route path="/" element={<MainPage />}>
        <Route path=":dexNumber" element={<PokemonDetail />} />
    </Route>
</Routes>
```

This routing setup will *always* render the `MainPage`, and will also render the `PokemonDetail` component when a dexNumber (or something that *looks* like a dexNumber) is supplied in the URL.

We also need to remove the `PokemonDetail` component from `MainPage` itself, and replace it with React Router's `<Outlet>` component. This is where React Router will render the `PokemonDetail` component inside `MainPage`:

```jsx
function MainPage() {

  ...

  return (
    <div>
      <h1>WDCC Pokédex</h1>
        ...

        <PokemonList ... />

        <Outlet />

        ...
    </div>
  );
}
```

*(the above is just a partial snippet - your code will look different, depending on how you styled it in session two)*

Once we've set that up, if we navigate to <http://localhost:5173/>, we'll see just our `PokemonList`, with no `PokemonDetail` view. However, if we supply a dexNumber on the end of the URL - for example, <http://localhost:5173/1> - the `PokemonDetail` component will be rendered too! However, this will likely crash your app in the browser at this point, because `PokemonDetail` was expecting us to supply a `pokemon` prop, which we're not doing anymore. We'll fix this in the next steps.

### 3C) Accessing route params
Rather than supplying a `pokemon` prop to `PokemonDetail`, we are now specifying the Pokémon to display via the `dexNumber` path param. In this step and the next one, we will refactor our app to get it working again.

Firstly, we can obtain the `dexNumber` path param using the `useParams()` hook from React Router, like so:

```js
const { dexNumber } = useParams();
```

Modify your `PokemonList` to display this value somewhere, just so we can see that it's working. Remove any reliance on a `pokemon` prop at this time, too.

You'll notice that we no longer have access to any Pokémon data to display, other than its `dexNumber`. We'll fix that soon! For now, display some dummy data just so your UI still looks ok. A good placeholder image you can use is [Placeholder.png](../public/images/Placeholder.png). You can display this in an image like so:

```jsx
<img src="/images/Placeholder.png" />
```

### 3D) Links
Let's also modify our `PokemonList` component, and our `MainPage`, to remove all references to our `currentPokemon` state. We don't need that stateful value any more, because the `dexNumber` of the current pokemon is now contained within the app's URL, as a path param.

Instead, within `PokemonList`, for each list item, render a React Router `<Link>`, whose `to` prop is set to the corresponding Pokémon's `dexNumber`. We will want to convert the `dexNumber` to a string, because values supplied to `to` must be strings. We can do this easily using its `toString()` method, or string literals. For example:

```jsx
<li><Link to={pokemon.dexNumber.toString()}>{pokemon.name}</Link></li>
```

If you like, you can use `NavLink`s instead of `Link`s. The main difference is that they allow us to style the links differently, depending on whether those links are currently "active". See [this page](https://reactrouter.com/docs/en/v6#navlink) for further details.

Now, clicking on any of the `PokemonList` items will cause a *client-side navigation* (fast, doesn't result in a page refresh) to the URL corresponding to that Pokémon.

### 3E) Getting data from the web
In this step, we'll use the **axios** library to fetch data from an online service (trex-sandwich), rather than having that data stored in `pokemon.json`. We will fetch data in two places:

1. In `PokemonList`, we'll fetch a list of `dexNumber`s and `name`s of all Pokémon
2. In `PokemonDetail`, we'll fetch a particular Pokémon with the `dexNumber` matching the path param.

Firstly, let's add a custom hook to our app: `useGet()`. This will allow us to reuse code associated ith sending HTTP `GET` requests to retrieve data. You can copy the following code into a file - the code was / will be demonstrated in a live demo.

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGet(url, initialState = null) {

    const [data, setData] = useState(initialState);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(url);
                setData(response.data);
                setLoading(false);
            } catch {
                setError(true);
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, isLoading, error };
}
```

We'll also need to install the axios package:

```sh
npm install axios
```

Essentially, this hook takes *two* arguments:
- `url`: The URL to fetch
- `initialState`: Any data to return by default, until such time as we have successfully retrieved data from the URL

And, it returns *three* values:
- `data`: The data retrieved from the URL (or the initial state, if data has not yet been retrieved)
- `isLoading`: A boolean value, true if the fetch request is currently underway, false otherwise
- `error`: If the fetch request failed, this will be true. Otherwise, this will be false.

Now, within `PokemonList`, obtain the required data from <https://wdcc-workshop-server.trex-sandwich.com/api/pokemon/> instead of a supplied `list` prop, and remove anything to do with `pokemon.json` from `App.js`. `useGet()`'s initial state can be an empty array `[]`.

Finally, within `PokemonDetail`, obtain the full details of a Pokémon from https://wdcc-workshop-server.trex-sandwich.com/api/pokemon/:dexNumber, where `:dexNumber` is the path param we obtain from `useParams()`. This time, also consider the following:

- We should display something different (perhaps a blank component, or a "Loading..." message, or similar) while the data is still loading. The return value from `useGet()` has an `isLoading` property that can assist us with this.

- We should display something different again, if an error occurs - for example, if the user browses to a Pokémon that doesn't exist. The return value from `useGet()` has an `error` property which can help us with this.