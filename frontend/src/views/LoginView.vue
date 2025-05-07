<template>
    <div class="login-view">
      <h2>Pieslēgties</h2>
      <div class="login-form">
        <InputText v-model="email" placeholder="E-pasts" />
        <Password v-model="password" placeholder="Parole" toggleMask />
        <Button label="Ieiet" @click="login" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { InputText } from 'primevue/inputtext';
  import { Password } from 'primevue/password';
  import { Button } from 'primevue/button';
  
  const email = ref('');
  const password = ref('');
  
  function login() {
    console.log('Logging in:', email.value, password.value);
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
  }
  </style>
  