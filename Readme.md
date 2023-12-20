# Svelte Browser Import

[![NPM Package](https://img.shields.io/npm/v/svelte-browser-import.svg)](https://www.npmjs.com/package/svelte-browser-import)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/repalash/svelte-browser-import/blob/master/LICENSE)

This is a simple library that includes the svelte compiler and provides functions to import and render a Svelte App/Component (.svelte files) directly inside a browser without a build step. (Useful for development and testing)

Extracted out the Bundler from the [Svelte REPL](https://svelte.dev/repl/).

Working demos: https://repalash.com/svelte-browser-import/index.html

## Usage

Use the importSvelte and render functions to render a svelte app inside the body of the current page. This uses `eval` to evaluate the code, so it is not recommended to use this in production.

### importSvelte

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Svelte Browser Import</title>
    <script type="module">
        import { importSvelte } from 'https://unpkg.com/svelte-browser-import/dist/svelte-browser-import.es.js';
        const App = await importSvelte('./HelloWorld.svelte')
        const app = new App({
            target: document.getElementById('app'),
        })
        
        // app.$destroy() // destroy the app
        
        // or just 
        // renderSvelte('./HelloWorld.svelte')
    </script>
</head>
<body>
<div id="app"></div>
</body>
</html>
```

### importSvelteUrls

To import multiple files which import each other, use the `importSvelteUrls` or `importSvelteBundle` function to import the files and then use the `render` function to render the app.

This needs a file named `App.svelte` which is the entry point, if not provided, the only file in the list will be renamed to `App.svelte`, if multiple files, then an `App.svelte` is created that renders all the files as components in the order they are provided.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Svelte Browser Import</title>
    <script type="module">
        import { importSvelteUrls } from 'https://unpkg.com/svelte-browser-import/dist/svelte-browser-import.es.js';
        const App = await importSvelteUrls([
            './App.svelte',
            './Nested.svelte',
        ])
        const app = new App({
            target: document.getElementById('app'),
        })
        
        // or just 
        // renderSvelteUrls([
        //     './App.svelte',
        //     './Nested.svelte',
        // ])
    </script>
</head>
<body>
<div id="app"></div>
</body>
</html>
```

### importSvelteBundle

Use the `importSvelteBundle` function to get access to all the parameters. Check the file src/main.ts for more details.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Svelte Browser Import</title>
    <script type="module">
        import { importSvelteBundle } from 'https://unpkg.com/svelte-browser-import/dist/svelte-browser-import.es.js';
        const res = await importSvelteBundle({
            urls: [
                './App.svelte',
                './Nested.svelte',
            ],
            // files: [ // only one of urls or files can be provided
            //     {
            //         name: 'App',
            //         type: 'svelte',
            //         content: '...',
            //         modified: true,
            //     }
            // ],
            packagesUrl: 'https://unpkg.com',
            svelteUrl: 'https://unpkg.com/svelte',
            injectedJS: '',
            injectedCSS: '',
            onstatus: (val) => {
                console.log(val)
            },
        })
        console.log(res)
        const App = new res.render()
        const app = new App({
            target: document.getElementById('app'),
        })
    </script>
</head>
<body>
<div id="app"></div>
</body>
</html>
```

### Non-module usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Svelte Browser Import</title>
    <script src="https://unpkg.com/svelte-browser-import"></script>
    <script>
        const { importSvelte } = window["svelte-browser-import"]
        const App = await importSvelte('./HelloWorld.svelte')
        const app = new App({
            target: document.getElementById('app'),
        })
    </script>
</head>
<body>
</body>
</html>
```
