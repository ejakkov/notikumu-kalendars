import events from EventListView.vue
<template>
  <div class="event-detail">
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
import { ref, computed } from 'vue';

const route = useRoute();
const id = parseInt(route.params.id);

const events = ref([
  {
    id: 1,
    title: 'Rīgas svētki',
    date: new Date('2025-08-18'),
    location: 'Rīga',
    description: 'Koncerti un salūts centrā.',
    category: 'Koncerts',
    image: 'https://www.jurmala.lv/sites/jurmala/files/styles/article_full_image_665x375_/public/gallery_images/buss.jpg?itok=hJOJ1mgs'
  },
  {
    id: 2,
    title: 'Jūrmalas festivāls',
    date: new Date('2025-07-10'),
    location: 'Jūrmala',
    description: 'Pludmales pasākums.',
    category: 'Festivāls',
    image: 'https://www.jurmala.lv/sites/jurmala/files/styles/article_full_image_665x375_/public/gallery_images/Arheologiskie%20pr.jpg?itok=QWlAKsgB'
  },
  {
    id: 3,
    title: 'Rīgas svētki',
    date: new Date('2025-08-18'),
    location: 'Rīga',
    description: 'Koncerti un salūts centrā.',
    category: 'Koncerts',
    image: 'https://www.jurmala.lv/sites/jurmala/files/styles/article_full_image_665x375_/public/gallery_images/buss.jpg?itok=hJOJ1mgs'
  },
  {
    id: 4,
    title: 'Jūrmalas festivāls',
    date: new Date('2025-07-10'),
    location: 'Jūrmala',
    description: 'Pludmales pasākums.',
    category: 'Festivāls',
    image: 'https://www.jurmala.lv/sites/jurmala/files/styles/article_full_image_665x375_/public/gallery_images/Arheologiskie%20pr.jpg?itok=QWlAKsgB'
  }
]);

const event = computed(() => events.value.find(e => e.id === id));

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