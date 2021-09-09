<template>
  <div>
    <h1>ランダム動画</h1>
    <YouTubeEmbed :youtube-id="videoId" />
    <b-button class="my-2" @click="changePickedVideo">次の動画へ</b-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, useFetch, ref, watch } from '@nuxtjs/composition-api';

import { V1Video } from '@/api/generated/models';
import YouTubeEmbed from '@/components/YouTubeEmbed.vue';

export default defineComponent({
  name: 'Random',
  components: {
    YouTubeEmbed,
  },
  setup(_, context: SetupContext) {
    const videoId = ref<string>('');
    const tmpVideoIds = ref<string[]>([]);
    const { fetch } = useFetch(async () => {
      const response = await context.root.$api.listVideoIds();
      tmpVideoIds.value = (response.id ?? []) ?? [];
    });
    fetch();

    function changePickedVideo() {
      videoId.value = tmpVideoIds.value[Math.floor(Math.random() * tmpVideoIds.value.length)];
    }

    watch(tmpVideoIds, changePickedVideo);

    return {
      videoId,
      changePickedVideo,
    };
  },
  head() {
    return {
      title: 'Random',
    };
  },
});
</script>
