<template>
    <div id="app" :class="themeClass">
      <Navbar />
      <router-view />
    </div>
  </template>
  
  <script>
  import { provide, ref } from 'vue';
  import Navbar from './components/Navbar.vue';
  import InputText from 'primevue/inputtext';

  export default {
    components: {
      Navbar,
      InputText
    },
    setup(){
      var isLoggedIn = ref(false);
      provide('isLoggedIn', isLoggedIn)
      return {
        isLoggedIn
      }
    }
  };
  </script>
  <style>
    body{
      font-family: 'Roboto Slab', serif;
    }
  </style>