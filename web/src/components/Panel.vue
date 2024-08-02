<script setup>

import { RouterLink } from 'vue-router'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false
  },
  desc: {
    type: String,
    required: false
  },
  time: {
    type: String,
    required: false
  },
  banner: {
    type: String
  },
})


</script>

<template>
  <article>
    <span class="image">
      <img :src="banner" :alt="title" />
    </span>

    <RouterLink :to="`/video/${id}`">
      <h2>{{ title }}</h2>
      <h4>{{ subtitle }}</h4>
      <h6>{{ time }}</h6>
      <div class="content">
        <p>{{ desc }}</p>
      </div>
    </RouterLink>

  </article>
</template>