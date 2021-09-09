<template>
  <div>
    <Header />
    <main>
      <b-container class="my-2">
        <nuxt />
      </b-container>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'Layout',
});
</script>
