// === Using adapter-vercel
// import adapter from '@sveltejs/adapter-vercel';
// import preprocess from "svelte-preprocess";

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
//   kit: {
//     // default options are shown
//     adapter: adapter({
//       // if true, will deploy the app using edge functions
//       // (https://vercel.com/docs/concepts/functions/edge-functions)
//       // rather than serverless functions
//       edge: false,

//       // an array of dependencies that esbuild should treat
//       // as external when bundling functions. this only applies
//       // to edge functions, and should only be used to exclude
//       // optional dependencies that will not run outside Node
//       external: [],

//       // if true, will split your app into multiple functions
//       // instead of creating a single one for the entire app
//       split: false
//     })
//   },
//   preprocess: [
//     preprocess({
//       postcss: true,
//     }),
//   ],
// };

// export default config;


// === Using adapter-auto
import adapter from '@sveltejs/adapter-auto';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;

