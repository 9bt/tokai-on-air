<template>
  <div>
    <h1>最新動画</h1>
    <YouTubeEmbed :youtube-id="(video || {}).youtubeId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, useFetch, ref } from '@nuxtjs/composition-api';

import { V1Video } from '@/api/generated/models';
import YouTubeEmbed from '@/components/YouTubeEmbed.vue';

export default defineComponent({
  name: 'Index',
  components: {
    YouTubeEmbed,
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
      title: 'Index',
    };
  },
});
</script>
