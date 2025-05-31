<template>
    <div id="app" :class="themeClass">
      <Navbar />
      <router-view />
    </div>
  </template>
  
  <script>
  import Navbar from './components/Navbar.vue';
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext';

  export default {
    components: {
      Navbar,
      InputText
    }
  };
  </script>
  <style>
    body{
      font-family: 'Roboto Slab', serif;
    }
  </style>