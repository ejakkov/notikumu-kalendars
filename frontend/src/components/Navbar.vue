<template>
  <div>
    <nav>

      <div>
        <button class="language-toggler">LV</button>
      </div>
      <div class="title">
        
        <div class="logo">
          <router-link to="/"><img src="../assets/notikumukalendars-logo.png" alt="Logo" class="logo" /></router-link>
        </div>
        <router-link to="/"><p>Notikumu kalendārs</p></router-link>
      </div>
      <div>
        <router-link to="/favorites">
          <img src="../assets/heart.png" alt="Logo" class="header-icons" />
        </router-link>
        <router-link to="/">
          <img src="../assets/bell.png" alt="Logo" class="header-icons" />
        </router-link>
        <router-link to="/login">
          <img src="../assets/account.png" alt="Logo" class="header-icons" />
        </router-link>
      </div>
      
    </nav>
  </div>
</template>

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

.title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 1rem;
}
.title a{
  text-decoration: none;
  color: black;
}

.language-toggler {
  font-size: 1.5rem;
  border: 0;
  border-bottom: 1px solid #000;
}

.header-icons {
  height: 30px;
  width: 30px;
  margin-left: 1rem;
}
router-link {
  text-decoration: none;
}
</style>