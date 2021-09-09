<template>
  <div>
    <h1>最新動画一覧</h1>
    <b-card-group>
      <YouTubeCard v-for="video in videos" :key="video.youtubeId" :video="video" />
    </b-card-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, useFetch, ref } from '@nuxtjs/composition-api';

import { V1Video } from '@/api/generated/models';
import YouTubeCard from '@/components/YouTubeCard.vue';

export default defineComponent({
  name: 'Latest',
  components: {
    YouTubeCard,
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
  head() {
    return {
      title: 'Latest',
    };
  },
});
</script>
