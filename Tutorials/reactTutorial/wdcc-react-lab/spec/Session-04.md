## Session Four - Extensions
Well done - You've completed the WDCC React workshop! Now, we encourage you to keep up the practice! One way you can do this is by extending the Pokédex app. Some ideas are given here - but the sky's the limit!

- **Auto-navigate to a Pokémon on page load**: Currently, when we navigate to <http://localhost:5173/>, we see a blank screen with just our `PokemonList`. Instead, we could automatically navigate to a Pokémon - perhaps the Pokémon with `dexNumber` = 1 (or perhaps your favorite 'mon). React router's [`<Navigate>` component](https://reactrouter.com/docs/en/v6/components/navigate), or [`useNavigate()` hook](https://reactrouter.com/docs/en/v6/hooks/use-navigate), can assist with this.

- **Shiny Pokémon**: You'll notice that the data for a Pokémon returned from the trex-sandwich server has a `shinyImageUrl` in addition to its normal `imageUrl`. Perhaps you could display the shiny and non-shiny images side-by-side, or add a toggle button to switch between them - or even "randomly" show the shiny image instead of the normal image, with some (small) percentage chance!

- **Caching**: Currently, if we browse to a particular Pokémon, a new web request will be made, even if we've already navigated to that Pokémon before. Consider how you can refactor your app so that it doesn't need to send each request more than once.

- **Local storage**: Adding on to the above, investigate how you might use [local browser storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to cache data even across page refreshes / reloads.

- **Service workers**: Alternatively, [service workers](https://developers.google.com/web/tools/workbox) could be used to provide very fine-grained control over caching of web requests, and can also be used to make your app available "offline".

- **Globalizing state**: Currently, we're storing the Pokémon list inside the `PokemonList` component, after loading it from the web. However, if we ever need to modify that list from elsewhere in the application, things will get tricky. To alleviate this issue, investigate how we can globalize this state, so it can be accessed and modified from anywhere within our app. We can do this useing React's [Context api](https://reactjs.org/docs/context.html), or with a third-party library such as [Redux](https://redux.js.org/).
