<template>
  <b-embed
    v-if="isValid"
    :src="embedURL"
    type="iframe"
    aspect="16by9"
    allowfullscreen
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'YouTubeFrame',
  props: {
    youtubeId: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const isValid = computed<boolean>(() => props.youtubeId !== '');
    const embedURL = computed<string>(() => {
      return props.youtubeId !== '' ? `https://www.youtube.com/embed/${props.youtubeId}` : '';
    });

    return {
      isValid,
      embedURL,
    };
  },
});
</script>
