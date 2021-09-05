<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

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
    youtubeURL: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const isURLValid = computed<boolean>(() => props.youtubeURL !== '');

    return {
      isURLValid,
    };
  },
});
</script>

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
