import Vue from 'vue';
import { VideoServiceApi, Configuration } from '@/api/generated';

declare module 'vue/types/vue' {
  interface Vue {
    $api: VideoServiceApi;
  }
}

const configuration = new Configuration({
  basePath: process.env.SERVER_BASE_URL,
});

Vue.prototype.$api = new VideoServiceApi(configuration);
