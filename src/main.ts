import './style.css'
import Bundler from './svelte-bundler/Bundler'

export const defaultsProps = {
    packagesUrl: 'https://unpkg.com',
    svelteUrl: 'https://unpkg.com/svelte',
    injectedJS: '',
    injectedCSS: '',
    onstatus: (val: string | null) => {
        console.log(val)
    },
    files: undefined as any[] | undefined/*[
        {
            name: 'App',
            type: 'svelte',
            modified: true as boolean | undefined,
            url: undefined as string | undefined,
            source: `
                <script>
                </script>
                <h1>Demo File</h1>
                <style>
                    h1 {
                        color: red;
                    }
                </style>
            ` as string | undefined,
        },
    ]*/,
    urls: [] as string[]
}

export async function importSvelteBundle(props: Partial<typeof defaultsProps>) {
    const {packagesUrl, svelteUrl, injectedJS, injectedCSS, onstatus, files: files1, urls} = {...defaultsProps, ...props}
    let files = files1!
    if(urls && !files){
        files = urls.map((file) => ({
            name: file.split('/').pop()!.replace(/\..+$/, ''),
            type: file.split('.').pop()!,
            url: file,
        })) as any
    }
    // console.log('importSvelte', {packagesUrl, svelteUrl, injectedJS, injectedCSS, onstatus, files})
    const bundler = new Bundler({
        packages_url: packagesUrl,
        svelte_url: svelteUrl,
        onstatus,
    })
    // console.log('bundler', bundler)
    // const files = [
    //     {
    //         name: 'App',
    //         type: 'svelte',
    //         modified: true,
    //         source: await fetch('samples/HelloWorld.svelte').then((res) => res.text()),
    //     },
    // ]

    for (const file of files) {
        if(file.url && !file.source) {
            file.source = await fetch(file.url).then((res) => res.text())
            console.log(file.source)
            delete file.url
        }
        if(file.modified === undefined) file.modified = true
        // console.log(file)
    }
    console.log(files)
    let appFile = files.find((file) => file.name === 'App')
    if(!appFile) {
        if(files.length === 1) {
            appFile = files[0]
            appFile.name = 'App' // required else svelte compiler throws error
        }
        else {
            // @ts-ignore
            appFile = {
                name: 'App',
                type: 'svelte',
                modified: true,
                source: `
            <script>
            ` + files.map((file) => `import ${file.name} from '${file.name}.${file.type}'`).join('\n') + `
            </script>
            ` + files.map((file) => `<${file.name} />`).join('\n') + `
            `,
            }
            files.push(appFile!)
        }

    }

    const bundle = await bundler.bundle(files)
    // console.log('bundle', bundle)

    const code = `
				${injectedJS}

				${injectedCSS &&
    `{
		const style = document.createElement('style');
		style.textContent = ${JSON.stringify(injectedCSS)};
		document.head.appendChild(style);
	}`}

				const styles = document.querySelectorAll('style[id^=svelte-]');

				let i = styles.length;
				while (i--) styles[i].parentNode.removeChild(styles[i]);

				if (window.component) {
					try {
						window.component.$destroy();
					} catch (err) {
						console.error(err);
					}
				}

				document.body.innerHTML = '';
				window.location.hash = '';
				window._svelteTransitionManager = null;

				${bundle.dom?.code}

				window.component = new SvelteComponent.default({
					target: document.body
				});
			`

    const func = new Function('SvelteFiles', code)
    // console.log(bundle)
    // console.log(func)
    return {
        dom: bundle.dom,
        render: func,
    }
}

export async function importSvelte(url: string){
    return importSvelteBundle({urls: [url]})
}
export async function importSvelteUrls(urls: string[]){
    return importSvelteBundle({urls})
}
export async function renderSvelte(url: string){
    (await importSvelteBundle({urls: [url]})).render()
}
export async function renderSvelteUrls(urls: string[]){
    (await importSvelteBundle({urls})).render()
}
// todo: do we need to install these? @rollup/browser, esm-env, resolve.exports, acorn, estree-walker
