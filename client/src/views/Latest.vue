<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';

import { createApiClientWithToken } from '@/api-client';
import { V1Video } from '@/api-client/generated/models';

export default defineComponent({
  name: 'Latest',
  components: {},
  setup() {
    const apiClient = createApiClientWithToken();

    const videos = ref<V1Video[]>([]);

    onMounted(async () => {
      const response = await apiClient.listLatestVideos();
      videos.value = response.video ?? [];
    });

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

<template>
  <h3>最新動画</h3>
  <div v-for="video in videos" :key="video.youtubeId" :id="video.youtubeId">
    <a :href="`https://www.youtube.com/watch?v=${video.youtubeId}`">
      <img :src="`http://img.youtube.com/vi/${video.youtubeId}/sddefault.jpg`" />
      <span>{{ video.name }}</span>
    </a>
  </div>
</template>
