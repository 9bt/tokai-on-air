<template>
  <a v-if="isValid" :href="youtubeURL" class="my-1">
    <b-card>
      <b-row no-gutters>
        <b-col md="4">
          <b-card-img :src="thumbnailURL" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body>
            <b-card-text class="name">{{ video.name }}</b-card-text>
            <b-card-text class="published-at">{{ formatDateTime(video.publishedAt) }}</b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api';
import format from 'date-fns/format';

import { V1Video } from '@/api/generated/models';

export default defineComponent({
  name: 'YouTubeCard',
  props: {
    video: {
      type: Object as PropType<V1Video | null>,
      default: null,
    },
  },
  setup(props) {
    const isValid = computed<boolean>(() => props.video !== null);
    const youtubeURL = computed<string>(() => {
      return props.video?.youtubeId !== '' ? `https://www.youtube.com/watch?v=${props.video?.youtubeId}` : '';
    });
    const thumbnailURL = computed<string>(() => {
      return props.video?.youtubeId !== '' ? `http://img.youtube.com/vi/${props.video?.youtubeId}/maxresdefault.jpg` : '';
    });

    function formatDateTime(dateStr: string): string {
      return format(new Date(dateStr), 'yyyy-MM-dd HH:mm:ss');
    }

    return {
      isValid,
      youtubeURL,
      thumbnailURL,
      formatDateTime,
    };
  },
});
</script>

<style scoped lang="scss">
a {
  width: 100%;
  color: #333;
  text-decoration: none;

  &:hover {
    color: #146fab;
  }

  .name {
    font-weight: 700;
  }

  .published-at {
    color: #777;
  }
}

.card-body {
  padding: .5rem;
}

.card:hover {
  opacity: 0.6;
}

</style>
