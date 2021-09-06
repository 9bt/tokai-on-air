<template>
  <div>
    <h3>最新動画</h3>
    <YouTubeFrame :youtube-id="(video || {}).youtubeId" />

    <router-link :to="{ name: 'latest' }">最新動画一覧へ</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, useFetch, ref } from '@nuxtjs/composition-api';

import { V1Video } from '@/api/generated/models';
import YouTubeFrame from '@/components/YouTubeFrame.vue';

export default defineComponent({
  name: 'Home',
  components: {
    YouTubeFrame,
  },
  setup(_, context: SetupContext) {
    const video = ref<V1Video | null>(null);
    const { fetch } = useFetch(async () => {
      const response = await context.root.$api.listLatestVideos();
      video.value = (response.video ?? [])[0] ?? null;
    });
    fetch();

    return {
      video,
    };
  },
  head() {
    return {
      title: 'Home',
    };
  },
});
</script>
