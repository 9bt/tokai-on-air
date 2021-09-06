import Vue from 'vue';
import { VideoServiceApi, Configuration } from '@/api/generated';

declare module 'vue/types/vue' {
  interface Vue {
    $api: VideoServiceApi;
  }
}

const configuration = new Configuration({
  basePath: 'http://localhost:8000',
});

Vue.prototype.$api = new VideoServiceApi(configuration);
