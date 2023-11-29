## Session One - A basic Pokédex
In the first session, we'll build some React components to represent the Pokédex. We'll start by displaying some hardcoded data, then move on to displaying the actual data contained within the provided [`pokemon.json`](./src/pokemon.json) file. This file contains data on the first 50 Pokémon - sufficient for our testing purposes.

To begin, let's define some very basic requirements for our dex:

1. As a user, I want to be able to see a list of every Pokémon.
2. As a user, I want to be able to see detailed information about a specific Pokémon I select.

*(Feel free to add your own requirements to this list if you'd like to be more adventurous - but the steps in this lab will focus on satisfying these requirements)*

We can satisfy those requirements by having a page with a couple of distinct areas: one area displaying a list of Pokémon, and another displaying one particular Pokémon's detailed statistics. We will display Pokémon's `name`s and `dexNumber`s in the list. We'll display this same info in the detail area too, along with a Pokémon's image (from the provided `imageUrl`) and `dexEntry` text.

When we're done with this session, we might have a page which looks something like this:

![](./session-one-screenshot.png)

### 1A) List component
Let's start with creating a list component. To do this, create a new JSX file in the `src` folder, called `PokemonList.jsx`. In that file, create  a function to represent our list component. Call it `PokemonList`, like so:

```jsx
function PokemonList() {

}
```

After the function, add the following line, which will *export* this list, letting us access it from the rest of our app:

```jsx
export default PokemonList;
```

*Alternatively*, we could combine these lines like so:

```jsx
export default function PokemonList() {

}
```

Now, we'll have our list actually display some data! We can display our list as an HTML `<ul>` or `<ol>` for now. We have our component render this list by returning JSX (an HTML-like syntax designed to work with React and similar UI frameworks) from our component function, like so:

```jsx
function PokemonList() {
    return (
        <ul>
            <li>001 - Bulbasaur</li>
            <li>002 - Ivysaur</li>
            <li>003 - Venusaur</li>
        </ul>
    );
}
```

Once you've done this, start your app in development mode (`npm run dev` - or use the NPM script shortcut in VS Code), if it's not already running. You won't see your list on-screen just yet - that's because we need to render our `PokemonList` from within `App.jsx`.

Currently, `App.jsx` renders a single heading. Start by modifying it to render a `<div>` instead. That div can contain an appropriate heading (e.g. "WDCC Pokédex"), along with our `PokemonList`. Remember that we first need to *import* our list from its JS file into `App.jsx`:

```jsx
import PokemonList from './PokemonList';
```

Then, we can render it just as we could render any basic HTML element:

```jsx
function App() {
  return (
    <div>
      <h1>Your app here!</h1>
      <PokemonList />
    </div>
  );
}
```

Now, we should be able to see our list on screen!

### 1B) Detailed info
Next, we'll add another React component which will display detailed info about a specific Pokémon. Create a component called `PokemonDetail` in its own file, and have it render a `<div>`, with three children:

1. A heading which will display a Pokémon's dex number and name
2. An image which will display a Pokémon's image (using its `src` attribute)
3. A paragraph which will display the Pokédex entry text.

To start with, you can use the following data for testing purposes:

- **Dex number:** 001
- **Name:** Bulbasaur
- **Image URL:** <https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png>
- **Pokédex entry:** While it is young, it uses the nutrients that are stored in the seed on its back in order to grow.

Finally, add your `PokemonDetail` component to `App.jsx`, to verify that it displays correctly. You can display it above or below the `PokemonList` - up to you.

### 1C) Props
Up till now, we've been hardcoding data in our React components, for testing purposes. In this step, we'll instead supply our two React components with the data they need, using *props*. Props allow us to supply data in the form of key-value pairs, like so:

```jsx
<AboutMe name="Ash Ketchum" age={10} />
```

Note the `{}` syntax for specifying Ash's `age`. You can suppy any valid JavaScript expression inside those squiggly braces.

Within our component, we can access prop values supplied to us, via the first argument to our component function, like so:

```jsx
function AboutMe(props) {
    return (
        <p>Hello, my name is {props.name}, and I'm {props.age} years old!</p>
    )
}
```

Again, notice the use of `{}` to access the values of our props. We can use this syntax anywhere within our JSX.

Rather than referencing `props` all over the place within our component code, a common practice is to instead use JavaScript *object destructuring* syntax to directly gain access to our individual props:

```jsx
function AboutMe({ name, age }) {
    return (
        <p>Hello, my name is {name}, and I'm {age} years old!</p>
    )
}
```

Let's start by prop-ifying our `PokemonDetail` component. We could do this in one of two ways:

- Either we could give it *four* props - one each for a Pokémon's dex number, name, image URL, and dex entry; OR
- We could give it jst *one* prop, where we supply the whole Pokémon data structure at once.

Looking at our `pokemon.json` data file, we can see that this contains an array of Pokémon, each one formatted like so:

```json
{
    "dexNumber": 6,
    "name": "Charizard",
    "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png",
    "dexEntry": "Its wings can carry this Pokémon close to an altitude of 4,600 feet. It blows out fire at very high temperatures."
}
```

We'll set up our `PokemonDetail` component to take a single one of these objects as a prop - called `pokemon`. We'll render that Pokémon's `dexNumber`, `name`, `imageUrl`, and `dexEntry` properties in the appropriate place. Make this change now, and then from `App.jsx`, supply a Pokémon object as a prop, to check that your component still renders correctly. For example:

```jsx
function App() {
    const pokemon = {
        dexNumber: 25,
        name: "Pikachu",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png",
        dexEntry: "Possesses cheek sacs in which it stores electricity."
    }

    return (
        <PokemonDetail pokemon={pokemon} />
    );
}
```

### 1D) Iterating through arrays
Next, we'll modify our `PokemonList` component to get its data from props too. This time, we want to supply an entire *array* of Pokémon as a prop, and we'll want to render one `<li>` for *each* of those Pokémon.

Start by supplying the entire contents of `pokemon.json` to our `PokemonList`, as a prop called `list`. The partial code snippet below shows how we can import a local JSON file. We do this at the top of `App.js`, along with the rest of our imports:

```jsx
import mons from './pokemon.json';
```

Now, within our `PokemonList` component, we'll render the supplied `list` as a bunch of `<li>`'s. We can do this using JavaScript arrays' `map()` function. This function will loop through all elements of an array, and return a new array based on the contents of the source array. React can render arrays of JSX components, if supplied in `{}`:

```jsx
<div>{[<p>First item</p>, <p>Second item</p>]}</div>
```

Therefore, if we use `map()` to convert an array of objects to an array of React components, React will render it just fine! For example:

```jsx
function PersonList() {
    const people = [
        { id: 1, name: "Alice", age: 21 },
        { id: 1, name: "Bob", age: 32 }
    ]

    return (
        <ul>
            {people.map((person) => (
                <li key={person.id}>{person.name} is {person.age} years old</li>
            ))}
        </ul>
    )
}
```

Note the **`key`** prop of the `<li>` above. When we render arrays of components as we are doing here, we should supply a `key` prop, whose value should be unique within that array. This allows React to make certain optimizations when rendered data changes. In the case of our `PokemonList`, a Pokémon's `dexNumber` is a great candidate for a key.

At the same time you implement this, you can also modify `App.jsx` so that it also gets its data from the `pokemon.json` array. For now, we can simply display the first Pokémon in the list, like so:

```jsx
<PokemonDetail pokemon={mons[0]} />
```