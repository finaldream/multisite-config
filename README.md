# Multisite Configuration Module

Configuration Module to load multiple site configuration for both frontend and backend usage

## Example Structure

```
- /
   |
   +- default
   |  |
   |  +- site.js:
   |  |     module.exports = {
   |  |         title: "Default Title",
   |  |         description: "Lorem Ipsum",
   |  |         magicNumber: 42
   |  |     }
   |  |
   |  +- api.js:
   |  |     module.exports = {
   |  |         apiEndpoint: "https://jsonplaceholder.typicode.com/posts"
   |  |     }
   |  |
   |  `- api.development.js:
   |        module.exports = {
   |            apiEndpoint: "https://127.0.0.1:3000/posts"
   |        }
   |
   +- site-1.de
   |  |
   |  +- site.js:
   |  |     module.exports = {
   |  |         title: "Site 1 DE",
   |  |         description: "Hallo Welt!",
   |  |         magicNumber: 123
   |  |     }
   |  |
   |  +- site.development.js:
   |  |     module.exports = {
   |  |         title: "Site 1 DE (Dev)"
   |  |     }
   |  |
   |  `- api.js:
   |        module.exports = {
   |            apiEndpoint: "https://reqres.in/api/posts?lang=de"
   |        }
   |
   +- site-1.com
   |  |
   |  +- site.js:
   |  |     module.exports = {
   |  |         title: "Site 1 EN",
   |  |         description: "Hello World!",
   |  |         magicNumber: 456
   |  |     }
   |  |
   |  `- api.js:
   |        module.exports = {
   |            apiEndpoint: "https://reqres.in/api/posts"
   |        }
   |
   `- site-2.com
      |
      +- site.js:
      |     module.exports = {
      |         title: "Site 2",
      |         description: "Another site",
      |     }
      |
      `- api.js:
            module.exports = {
                apiEndpoint: "https://slack.com/api/api.test?lang=en"
            }
```

## Usage

### Server-side

```js
// import module
import { provider, config } from 'multisite-config';

// initialize on first use
provider.load('site-1.de', 'development');

// get values
config.get('site.title') // Site 1 DE (Dev)

// dehydrate (prepare for sending to the client) - parse config and stringify to JSON
const jsonString = config.dehydrate('site-1.de', 'development'); // JSON string
```

### Client-side

```js
// import module
import { config } from 'multisite-config';

// load config from 'dehydrated'-state
config.load(jsonString);

// get values
config.get('site.title') // Site 1 DE (Dev)
```