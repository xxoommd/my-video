<script setup>
import Panel from './Panel.vue';
import db from './js/db.js';
import { ref } from 'vue';

const data = ref([]);

// onMounted(() => {

// });
db.listAll({}, videos => {
  data.value = videos;
})
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
