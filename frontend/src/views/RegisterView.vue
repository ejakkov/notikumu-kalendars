<template>
  <div class="register-view">
    <div class="register-form">
      <div class="register-header">
        <i class="pi pi-user-plus"></i>
        <span>Reģistrācija</span>
      </div>
      <div class="register-body">
        <label for="input-name">Vārds</label>
        <input id="input-name" type="text" name="name" v-model="name" />


        <label for="input-email">E-pasts</label>
        <input id="input-email" type="email" name="email" v-model="email" />


        <label for="input-password">Parole</label>
        <input id="input-password" type="password" name="password" v-model="password" />

        <label for="input-confirm-password">Apstiprini paroli</label>
        <input id="input-confirm-password" type="password" name="confirmPassword" v-model="confirmPassword" />
      </div>
      <div class="register-footer">
        <button @click="register">Reģistrēties</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

function register() {
  if (password.value !== confirmPassword.value) {
    alert('Paroles nesakrīt!');
    return;
  }

  axios.post('http://localhost:5000/api/auth/register', {
    name: name.value,
    email: email.value,
    password: password.value,
    isAdmin: false
  })
  .then((response) => {
    router.push('/');
    console.log(response.data);
  })
  .catch((error) => {
    alert("Reģistrācija neveiksmīga!");
    console.error("Login error: ", error);
  })
}
</script>

<style>
.register-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
.register-form {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 540px;
  font-family: Calibri;
}
.register-header {
  display: flex;
  font-size: 14pt;
}
.register-header span {
  display: block;
  margin-left: 10px;
  padding-top: 3px;
  border-top: 2px solid #DDD;
  width: 500px;
}
.register-header i {
  display: block;
}
.register-body {
  display: flex;
  flex-direction: column;
  padding: 60px 60px 10px 60px;
}
.register-body input {
  padding: 6px;
  border-radius: 7px;
  border: 1px solid #DDD;
  outline: none;
  transition: 200ms;
}
.register-body input:focus {
  border: 1px solid #999;
}
.register-body label {
  display: block;
  margin: 4px;
}
.register-footer {
  padding-right: 60px;
  display: flex;
  justify-content: right;
}
.register-footer button {
  padding: 7px;
  border: none;
  background: #332;
  color: #EEE;
  border-radius: 6px;
  transition: 200ms background;
}
.register-footer button:hover {
  background: #554;
}
</style>