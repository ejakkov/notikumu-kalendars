<template>
    <div class="event-list-view">
      <h1>Notikumu saraksts</h1>
      <div class="filters">
        <InputText v-model="search" placeholder="Meklēt notikumu..." />
        <Dropdown v-model="selectedCategory" :options="categories" placeholder="Kategorija" />
        <Calendar v-model="selectedDate" placeholder="Datums" />
      </div>
  
      <div class="event-list">
        <div v-for="event in filteredEvents" :key="event.id" class="event-card">
          <template class="title">{{ event.title }}</template>
          <template class="content">
            <p><strong>Datums:</strong> {{ formatDate(event.date) }}</p>
            <p><strong>Vieta:</strong> {{ event.location }}</p>
            <p>{{ event.description }}</p>
          </template>
        </div>
      </div>
    </div>
  </template>
  
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
      description: 'Koncerti un salūts centrā.'
    },
    {
      id: 2,
      title: 'Jūrmalas festivāls',
      date: new Date('2025-07-10'),
      location: 'Jūrmala',
      description: 'Pludmales pasākums.'
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
  
  <style>
  .event-list-view {
    padding: 2rem;
  }
  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .event-list {
    display: grid;
    gap: 1rem;
  }
  </style>
  