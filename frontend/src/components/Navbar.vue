<template>
  <div>
    <nav>
      <div>
        <button class="language-toggler">LV</button>
      </div>
      <div class="nav-title">
        <div class="logo">
          <router-link to="/"><img src="../assets/notikumukalendars-logo.png" alt="Logo" class="logo" /></router-link>
        </div>
        <router-link to="/"><p>Notikumu kalendārs</p></router-link>
      </div>
      <div class="nav-icons">
        <router-link v-if="isLoggedIn" to="/favorites" class="icon-link">
          <i class="pi pi-heart"></i>
        </router-link>
        <router-link v-if="isLoggedIn" to="/" class="icon-link">
          <img src="../assets/bell.png" alt="Logo" class="header-icons" />
        </router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="icon-link">
          <img src="../assets/account.png" alt="Logo" class="header-icons" />
        </router-link>
        <span style="cursor: pointer" v-if="isLoggedIn" @click="logout()" class="icon-link">
          <img src="../assets/logout.png" alt="Logo" class="header-icons" />
        </span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import router from "../router";

var isLoggedIn = inject('isLoggedIn');
if(localStorage.getItem("authToken") !== null){
  isLoggedIn.value = true;
}

function logout(){
  isLoggedIn.value = false;
  localStorage.removeItem("authToken");
  router.push("/")
}
</script>

<style>
body{
  margin: 0;
}
.wrapper {
  display: flex;
  align-items: center;
  padding: 2rem;
}
nav {
  display: flex;
  gap: 1rem;
  background: #f0f0f0;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.nav-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 1rem;
}
.nav-title a{
  text-decoration: none;
  color: black;
}

.language-toggler {
  font-size: 1.5rem;
  border: 0;
  border-bottom: 1px solid #000;
}

.nav-icons {
  display: flex;
  align-items: center;
}

.icon-link {
  text-decoration: none;
  margin-left: 1rem;
  display: flex;
  align-items: center;
}

.icon-link i {
  font-size: 1.5rem;
  color: #333;
}

.header-icons {
  height: 30px;
  width: 30px;
}
</style>