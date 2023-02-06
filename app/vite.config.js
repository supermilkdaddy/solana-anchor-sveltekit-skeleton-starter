// TODOS:
// - Next, reference https://github.com/silvestrevivo/solana-svelte-counter/blob/master/app/vite.config.js
//   and start adding props to vite config like build and define

// === WORKS: vite-plugin-node-polyfills package instead
// REF: https://discord.com/channels/457912077277855764/1064920777901752531/1071339806690377800
// REF: https://github.com/voracious/vite-plugin-node-polyfills
// Q: Think I need to install @project-serum as a dependency for Vercel
// because the demo app from svelte-on-solana has it installed
// REF: https://github.com/silvestrevivo/solana-svelte-counter/blob/master/app/vite.config.js
// A: WORKS! Installed @project-serum as a dependency and redeployed and works!
// https://solana-anchor-sveltekit-skeleton-starter-o6yb1pvk9.vercel.app
import { sveltekit } from '@sveltejs/kit/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true
    })
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
};

export default config;

// // === Eh, kinda works but still Not found @project-serum node issue
// // NOTE I had to npm i -D vite-compatible-readable-stream
// // NOTE Also defined buffer in layout.ts
// // import { sveltekit } from '@sveltejs/kit/vite';
// // /** @type {import('vite').UserConfig} */
// const config = {
//   plugins: [sveltekit()],
//   resolve: {
//     alias: {
//       Buffer: 'vite-compatible-readable-buffer',
//       stream: 'vite-compatible-readable-stream'
//     }
//   }
// };
// export default config;

// === ORIGINAL (kinda janky)
// /** @type {import('vite').UserConfig} */
// const config = {
//   plugins: [sveltekit()],
//   optimizeDeps: {
//     include: ['@project-serum/anchor', '@solana/web3.js', 'buffer'],
//   },
//   test: {
//     include: ['src/**/*.{test,spec}.{js,ts}']
//   }
// };


// // ==== ORIGINAL (Kinda works...)=====
// import inject from '@rollup/plugin-inject';
// import { sveltekit } from '@sveltejs/kit/vite';

// /** @type {import('vite').UserConfig} */
// const config = {
//   plugins: [sveltekit()],
//   optimizeDeps: {
//     include: ['@project-serum/anchor', '@solana/web3.js', 'buffer'],
//   },
//   build: {
//     rollupOptions: {
//       plugins: [inject({ Buffer: ['buffer', 'Buffer']})]
//     }
//   },
//   server: {
//     host: true
//   },
//   test: {
//     include: ['src/**/*.{test,spec}.{js,ts}']
//   }
// };

// export default config;


// // ===== FAILED POLYFILLS ATTEMPT ======
// // IMPORTANT Using svelte-on-solana demo app as reference: https://github.com/silvestrevivo/solana-svelte-counter/blob/master/app/vite.config.js
// // REF https://github.com/metaplex-foundation/js-examples/tree/main/getting-started-vite
// // REF https://stackoverflow.com/a/70666018
// // REF https://github.com/aeither/dapp-scaffold-svelte/blob/update-svelte/vite.config.js
// import { sveltekit } from '@sveltejs/kit/vite';
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// // NOTE There is an updated, community-maintained fork
// // called rollup-plugin-polyfill-node (NOT the original/older one!)
// // REF https://stackoverflow.com/a/74123844
// import nodePolyFills from "rollup-plugin-polyfill-node";
// import inject from '@rollup/plugin-inject';


// // es2020 Needed for BigNumbers
// // See https://github.com/sveltejs/kit/issues/859

// /** @type {import('vite').UserConfig} */
// const config = {
//   plugins: [sveltekit()],
//   resolve: {
//     alias: {
//       stream: "rollup-plugin-polyfill-node/polyfills/stream",
//     },
//   },
//   define: {
//     'process.env.BROWSER': true,
//     'process.env.NODE_DEBUG': JSON.stringify(''),
//     'process.env.VERSION': JSON.stringify(process.env.npm_package_version)
//   },
//   optimizeDeps: {
//     include: ['@solana/web3.js', 'buffer'],
//     esbuildOptions: {
//       // Node.js global to browser globalThis
//       define: {
//         global: "globalThis",
//       },
//       target: 'esnext',
//       // Enable esbuild polyfill plugins
//       // NOTE If I need 'process' as well, can add as well:
//       // REF https://stackoverflow.com/a/74123844
//       plugins: [
//         NodeGlobalsPolyfillPlugin({ buffer: true }),
//         NodeModulesPolyfillPlugin()
//       ],
//     },
//   },
//   build: {
//     target: 'esnext',
//     commonjsOptions: {
//       transformMixedEsModules: true
//     },
//     rollupOptions: {
//       plugins: [
//         inject({
//           modules: {
//             Buffer: ['buffer', 'Buffer'] 
//           } 
//         }),
//         nodePolyFills({ crypto: true })
//       ],
//     },
//   },
//   server: {
//     host: true
//   }
// };

// export default config;


