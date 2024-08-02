<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import db from './js/db.js';
import { useRoute } from 'vue-router';

const id = ref(useRoute().params.id);
const title = ref('');
const banner = ref('');
const desc = ref('');
const playlist = ref([]);

let currentPlay = ref('')

defineProps({
  title: {
    type: String
  }
})


onMounted(() => {
  db.getVideo({ id: id.value }, video => {
    title.value = video.title;
    banner.value = video.banner;
    desc.value = video.desc;
    playlist.value = video.playlist;
    if (playlist.value.length > 0) {
      currentPlay.value = playlist.value[0]
    }
  });
})

onUpdated(() => {

})

function onClickV(v) {
  console.log('-- onClickV:', v)
  currentPlay.value = v
}

function trimName(name) {
  let tmp1 = name.split('/')
  if (tmp1.length > 0) {
    let tmp2 = tmp1[tmp1.length - 1].split('.')
    if (tmp2.length > 1) {
      return tmp2[0]
    }
    return tmp2
  }
  return tmp1
}

</script>

<template>
  <div id="main">
    <div class="inner">
      <h1>{{ title }}</h1>
      <span class="image main">
        <video :key="currentPlay" width="100%" height="320px" controls>
          <source :src="currentPlay" type="video/mp4">
        </video>
      </span>
      <!-- <p>{{ desc }}</p> -->
      <div>
        <button v-for="play in playlist" v-on:click="onClickV(play)"> {{ trimName(play) }} </button>
      </div>
    </div>
  </div>
</template>