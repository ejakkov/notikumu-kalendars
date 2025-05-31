import events from EventListView.vue
<template>
  <div class="event-detail" v-if="event">
    <div style="float: right;" v-if="isLoggedIn">
      <i class="pi pi-heart" id="heart" style="color: red; cursor: pointer; font-size: 18pt;" @click="favoriteEvent(event._id)" v-if="event.isFavorite"></i>
      <i class="pi pi-heart" id="heart" style="cursor: pointer; font-size: 18pt;" @click="favoriteEvent(event._id)" v-else></i>
    </div>
    <h1>{{ event.title }}</h1>
    <img class="detail-image" :src="event.image" alt="Event image" />
    <p><strong>Datums:</strong> {{ formatDate(event.date) }}</p>
    <p><strong>Vieta:</strong> {{ event.location }}</p>
    <p><strong>Kategorija:</strong> {{ event.category }}</p>
    <p class="description"><strong>Apraksts:</strong> {{ event.description }}</p>

    <iframe
      class="map"
      :src="googleMapUrl"
      width="100%"
      height="300"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { inject, ref, computed } from 'vue';
import axios from 'axios';

const route = useRoute();
const id = route.params.id;

var isLoggedIn = inject('isLoggedIn')

const events = ref([]);

axios.post('http://localhost:5000/api/event/list', {
  token: localStorage.getItem("authToken")
})
.then((response) => {
  events.value = response.data;
})
.catch((error) => {
  console.log(error);
})

const event = computed(() => events.value.find(e => e._id === id));

function favoriteEvent(eventId){
  axios.post('http://localhost:5000/api/event/favorite', {
    event: eventId,
    token: localStorage.getItem("authToken")
  })
  .then((response) => {
    var temp = event.value;
    temp.isFavorite = !temp.isFavorite;
    event.value = temp;
  })
  .catch((error) => {
    console.log(error);
  })
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('lv-LV');
}

const googleMapUrl = computed(() =>
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18540.03762256183!2d24.08273866726507!3d56.94919957350562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfd7a81ed531%3A0x6bec487673a5b6ae!2sRiga%20Technical%20University!5e0!3m2!1sen!2slv!4v1746985338391!5m2!1sen!2slv"`
);
</script>

<style scoped>
.event-detail {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  font-family: 'Roboto Slab', serif;
}

.detail-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
}

.description {
  margin: 20px 0;
}

.map {
  margin-top: 20px;
  border-radius: 10px;
}
</style>