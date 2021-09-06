<template>
  <iframe
    v-if="isURLValid"
    :src="youtubeURL"
    :width="width"
    :height="height"
    frameborder="0"
    allowfullscreen
  >
  </iframe>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api';

const DEFAULT_WIDTH = 560;
const DEFAULT_HEIGHT = 315;

export default defineComponent({
  name: 'YouTubeFrame',
  props: {
    width: {
      type: Number as PropType<number>,
      default: DEFAULT_WIDTH,
    },
    height: {
      type: Number as PropType<number>,
      default: DEFAULT_HEIGHT,
    },
    youtubeId: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const isURLValid = computed<boolean>(() => props.youtubeId !== '');
    const youtubeURL = computed<string>(() => {
      return props.youtubeId !== '' ? `https://www.youtube.com/embed/${props.youtubeId}` : '';
    });

    return {
      isURLValid,
      youtubeURL,
    };
  },
});
</script>
