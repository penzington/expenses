# Well Spent! expenses app

## See it running

First option is to run it locally, you can do it by running `make dev` in the root of the repository. There is also a deployed version at `https://ui-knhhnxutmx.now.sh`. Two caveats for the deployed version - it can be slow on the first load, because Now is shutting down idle services and it has boot it up on the first request. Since there is 3 different services here, it can take a while. The second caveat is that Now seems to not accept file uploads, at least in the way implemented in this API. So that functionality won't work through the deployed version.

## Tech decisions

### Adding GraphQL wrapper around the REST API

- The data state management complexity is vastly simplified for apps that use GraphQL
- It's easy to get type safety across the API interface with types generated from the schema
- I got to try a new version of the Urql library with hooks support
- I got to showcase some server-side skills

* Additional component that adds complexity to the system architecture
* With very few entity endpoints the GraphQL doesn't shine as much

### Using lingui for translations

I haven't don't translations for a while so I had to do some research to find a good solution. I looked for something that adds as little overhead as possible (i.e. small footprint in terms of code added to components and code added to the bundle). I also wanted to use english copy directly in the components and not rely on cryptic translation keys. I was very happy to find Lingui which offers a very clean solution based on Babel macros, static analysis of component code, and the good old PO files.

### Other library choices

- `date-fns` - it's a modern datetime library that offers an easy way to import only the functions one uses (e.g. as opposed to `momentjs`)
- `react-dropzone` - I've used `uppy` for uploads in the past, but for a simple project like this, it would be an overkill. Plus a new version of `react-dropzone` offers a clean, hook-based API.
- React, CRA, `styled-components` and Typescript - It's my go-to frontend solution at the moment, and I needed to be efficient due to time limitations
- `react-feather` - a neat icon set, exposed as SVGs wrapped in React components
- `urql` - a small and focused GraphQL client library. I decided to use it instead of my usual choice, Apollo Client, to test the changes in version 1, and see how the new hook-based API works. I'm really happy with it!

## Scope limitation

I've decided to descope the filtering. First of all, I've run out of time budget I dedicated to the project. Moreover, implementing filters client side would be fairly clumsy or would add a lot of complexity. E.g. if I wanted to add a filter based on the user name, I could filter the results for the current page (which would be easy but fairly useless), or I would have to progressively ask for more results until I fill the page or run out of results (which would be complex and still worse than server-side filtering).

I've also cut out creating a styled components theme, so the styling is using hard-coded color, spacing, fonts etc.

## How long did it take?

All in all the project took around 9 hours to code, split into smaller chunks of time over 3 days.

## What was the hardest part to implement?

It turned out to be non-trivial to build a GraphQL wrapper around an REST API that has a file upload feature. It's possible, but after playing with it for a while I decided to use the REST API directly for that one request.

## What functionalities are you most proud of?

I'm quite happy with the skeleton loading of expenses, it turned out quite slick. I also like that in the short time I managed to get full-stack type safety with typing generation based on the GraphQL schema.
