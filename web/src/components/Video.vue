<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import db from './js/db.js';
import { useRoute } from 'vue-router';

const id = ref(useRoute().params.id);
const title = ref('');
const banner = ref('');
const desc = ref('');
const playlist = ref([]);
const play1 = ref('');


onMounted(() => {
  console.log('--- video onMounted ---')

  db.getVideo({ id: id.value }, video => {
    title.value = video.title;
    banner.value = video.banner;
    desc.value = video.desc;
    playlist.value = video.playlist;
    play1.value = video.playlist[0];
  });
})

onUpdated(() => {
  console.log('--- video onUpdate ---')
})
</script>

<template>
  <div id="main">
    <div class="inner">
      <h1>{{ title }}</h1>
      <span class="image main">
        <video :key="play1" width="100%" height="320px" controls>
          <source :src="play1" type="video/mp4">
        </video>
      </span>
      <p>{{ desc }}</p>

    </div>
  </div>
</template>