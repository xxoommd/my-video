<script setup>
import { onMounted } from 'vue';
import Nav from './components/Nav.vue'
import Search from './components/Search.vue'
import jQuery from 'jquery'
import utils from './components/js/utils.js';
import app from './components/js/app.js';
import { RouterView } from 'vue-router'
import Main from './components/Main.vue'

onMounted(() => {
  utils(jQuery);
  app(jQuery);
})

</script>

<template>
  <div id="wrapper">
    <header id="header">
      <div class="inner">

        <a href="/" class="logo">
          <span class="symbol"><img src="./assets/images/my-logo.svg" alt="" /></span><span class="title">我的家庭影院</span>
        </a>

        <Search />

        <nav>
          <ul>
            <li><a href="#menu">Menu</a></li>
          </ul>
        </nav>

      </div>

      <Nav />
    </header>

    <RouterView />

  </div>
</template>
