<template>
  <div>
    <h3>最新動画一覧</h3>
    <div v-for="video in videos" :key="video.youtubeId" :id="video.youtubeId">
      <a :href="`https://www.youtube.com/watch?v=${video.youtubeId}`">
        <img :src="`http://img.youtube.com/vi/${video.youtubeId}/sddefault.jpg`" />
        <span>{{ video.name }}</span>
      </a>
    </div>

    <router-link :to="{ name: 'index' }">ホームへ</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, useFetch, ref } from '@nuxtjs/composition-api';

import { V1Video } from '@/api/generated/models';

export default defineComponent({
  name: 'Latest',
  head() {
    return {
      title: 'Latest',
    };
  },
  setup(_, context: SetupContext) {
    const videos = ref<V1Video[]>([]);
    const { fetch } = useFetch(async () => {
      const response = await context.root.$api.listLatestVideos();
      videos.value = response.video ?? [];
    });
    fetch();

    return {
      videos,
    };
  },
});
</script>

<style>
img {
  width: 20%;
}
</style>
