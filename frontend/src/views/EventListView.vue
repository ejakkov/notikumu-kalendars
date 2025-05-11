<template>
  <div class="filters">
    <input v-model="search" placeholder="Meklēt notikumu..." />
    <Dropdown v-model="selectedCategory" :options="categories" placeholder="Kategorija" />
    <Calendar v-model="selectedDate" placeholder="Datums" />
  </div>
  <div class="event-list-view">
    <div class="event-list">
      <!-- <div v-for="event in filteredEvents" :key="event.id" class="event-card">
        <img class="card-image" :src="event.image" />
        <p class="date-category">{{ formatDate(event.date) }} - {{ event.category }}</p>
        <template class="title">{{ event.title }}</template>
        <div class="content">
          <p> <img src="../assets/compass.png" class="location-icon">{{ event.location }}</p>
          <p>{{ event.description }}</p>
        </div>
      </div> -->
      <router-link
        v-for="event in filteredEvents"
        :key="event.id"
        :to="{ name: 'EventDetail', params: { id: event.id } }"
        class="event-card"
         style="text-decoration: none; color: inherit;">
        <img class="card-image" :src="event.image" />
        <p class="date-category">{{ formatDate(event.date) }} - {{ event.category }}</p>
        <template class="title">{{ event.title }}</template>
      <div class="content">
        <p><img src="../assets/compass.png" class="location-icon" />{{ event.location }}</p>
        <p>{{ event.description }}</p>
      </div>
    </router-link>
    </div>
  </div>
</template>

<style scoped>
.date-category {
  font-size: 0.9rem;
  color: #888;
  letter-spacing: 1px;
}

input {
  height: 50%;
}
.filters {
  align-items: center;
  height: 50px;
  width: 95%;
  border-bottom: 1px solid #ccc;
  justify-self: center;
  padding: 10px;
}

.location-icon {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.event-list-view {
  padding: 20px;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

p {
  margin: 0;
}

.event-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.event-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.event-card .title {
  font-size: 1.1rem;
  color: rgb(10, 99, 10);
  letter-spacing: 1px;
}

@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');

:root {
  font-family: 'Roboto Slab', serif;
}

.event-card .content p {
  margin: 5px 0;
  color: #555;
}

.event-card .content strong {
  color: #333;
}

.card-image {
  width: 100%;
  height: 300px;
}
</style>
<script setup>
import { ref, computed } from 'vue';
import { InputText } from 'primevue/inputtext';
import { Dropdown } from 'primevue/dropdown';
import { Calendar } from 'primevue/calendar';
import { Card } from 'primevue/card';

const components = {
  InputText,
  Dropdown,
  Calendar,
  Card
};

const search = ref('');
const selectedCategory = ref(null);
const selectedDate = ref(null);

const categories = ['Kultūra', 'Mūzika', 'Sports'];

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

const filteredEvents = computed(() => {
  return events.value.filter(ev => {
    const matchesSearch = ev.title.toLowerCase().includes(search.value.toLowerCase());
    const matchesCategory = selectedCategory.value ? ev.category === selectedCategory.value : true;
    const matchesDate = selectedDate.value ? new Date(ev.date).toDateString() === new Date(selectedDate.value).toDateString() : true;
    return matchesSearch && matchesCategory && matchesDate;
  });
});

function formatDate(date) {
  return new Date(date).toLocaleDateString('lv-LV');
}
</script>