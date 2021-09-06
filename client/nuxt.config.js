import path from 'path';

import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, '/.env'),
});

export default {
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'hid', name: 'robots', content: 'noindex' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  plugins: [
    '~/plugins/api-client.ts',
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/dotenv',
  ],
  modules: [
    'bootstrap-vue/nuxt',
  ],
  build: {
    babel: {
      babelrc: false,
      compact: false,
    },
  },
  srcDir: 'src/',
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
  },
  server: {
    port: 8080,
  },
};
