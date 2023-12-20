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
        const app = await importSvelte('./HelloWorld.svelte')
        app.render()
        
        // or just 
        // renderSvelte('./HelloWorld.svelte')
    </script>
</head>
<body>
</body>
</html>
```

### importSvelteUrls

To import multiple files which import each other, use the `importSvelteUrls` or `importSvelteBundle` function to import the files and then use the `render` function to render the app.

This needs a file named `App.svelte` which is the entry point, if not provided, the first file in the list will be renamed to `App.svelte`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Svelte Browser Import</title>
    <script type="module">
        import { importSvelteUrls } from 'https://unpkg.com/svelte-browser-import/dist/svelte-browser-import.es.js';
        const app = await importSvelteUrls([
            './App.svelte',
            './Nested.svelte',
        ])
        app.render()
    </script>
</head>
<body>
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
        const app = await importSvelteBundle({
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
        app.render()
    </script>
</head>
<body>
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
        const app = await importSvelte('./HelloWorld.svelte')
        app.render()
    </script>
</head>
<body>
</body>
</html>
```
