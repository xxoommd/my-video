<script setup>
import Panel from './Panel.vue';
import db from './js/db.js';
import { ref, onMounted } from 'vue';

const data = ref([]);

onMounted(() => {
  db.listVideos({ keyword: "" }, videos => {
    data.value = videos;
  })
});
</script>

<template>
  <div id="main">
    <div class="inner">
      <header>
      </header>
      <section class="tiles">
        <Panel v-for="item in data" v-bind="item" />
      </section>
    </div>
  </div>
</template>
