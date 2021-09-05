<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from 'vue';

import YouTubeFrame from '@/components/YouTubeFrame.vue';
import { createApiClientWithToken } from '@/api-client';

export default defineComponent({
  name: 'Home',
  components: {
    YouTubeFrame,
  },
  setup() {
    const apiClient = createApiClientWithToken();

    const tmpVideoIds = ref<string[]>([]);
    const videoId = ref<string>('');

    onMounted(async () => {
      const response = await apiClient.listVideoIds();
      tmpVideoIds.value = response.id ?? [];
    });

    function changePickedVideo() {
      videoId.value = tmpVideoIds.value[Math.floor(Math.random() * tmpVideoIds.value.length)];
    }

    watch(tmpVideoIds, changePickedVideo);

    const videoURL = computed<string>(() => {
      return videoId.value !== '' ? `https://www.youtube.com/embed/${videoId.value}` : '';
    });

    return {
      videoURL,
      changePickedVideo,
    };
  },
});
</script>

<style></style>

<template>
  <YouTubeFrame :youtubeURL="videoURL" />
  <br />
  <button @click="changePickedVideo">動画を変更する</button>
</template>
