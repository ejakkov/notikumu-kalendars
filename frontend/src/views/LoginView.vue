<template>
  <div class="login-view">
    <div class="login-form">
      <div class="login-header">
        <i class="pi pi-lock"></i>
        <span>Autorizācija</span>
      </div>
      <div class="login-body">
        <label for="input-username">Lietotājvārds</label>
        <input id="input-username" type="text" name="username" v-model="username" />
        <label for="input-password">Parole</label>
        <input id="input-password" type="password" name="password" v-model="password" />
      </div>
      <div class="login-footer">
        <a href="#">Aizmirsu paroli</a>
        <a href="/register">Reģistrēties</a>
        <button @click="login()">Autorizēties</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import axios from 'axios';
import { InputText } from 'primevue/inputtext';
import { Password } from 'primevue/password';
import { Button } from 'primevue/button';
import router from '../router';

const username = ref('');
const password = ref('');

var isLoggedIn = inject('isLoggedIn');
function login() {
  axios.post('http://localhost:5000/api/auth/login', {
    email: username.value,
    password: password.value
  })
  .then((response) => {
    localStorage.setItem('authToken', response.data.token);
    isLoggedIn.value = true;
    router.push('/');
  })
  .catch((error) => {
    alert("Lietotājvārds un/vai parole nepareiza.");
    console.error("Login error: ", error);
  })
}
</script>

<style>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
.login-form {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 540px;
  font-family: Calibri;
}
.login-header{
  display: flex;
  font-size: 14pt;
}
.login-header span{
  display: block;
  margin-left: 10px;
  padding-top: 3px;
  border-top: 2px solid #DDD;
  width: 500px;
}
.login-header i{
  display: block;
}
.login-body{
  display: flex;
  flex-direction: column;
  padding: 60px 60px 10px 60px;
}
.login-body input{
  padding: 6px;
  border-radius: 7px;
  border: 1px solid #DDD;
  outline: none;
  transition: 200ms;
}
.login-body input:focus{
  border: 1px solid #999;
}
.login-body label{
  display: block;
  margin: 4px;
}
.login-footer{
  padding-right: 60px;
  display: flex;
  justify-content: right;
}
.login-footer button{
  padding: 7px;
  border: none;
  background: #332;
  color: #EEE;
  border-radius: 6px;
  transition: 200ms background;
}
.login-footer button:hover{
  background: #554;
}
.login-footer a{
  text-decoration: none;
  color: black;
  display: block;
  margin: 5px 10px;
}
</style>
