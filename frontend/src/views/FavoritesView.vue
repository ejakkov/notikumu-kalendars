<template>
    <div class="favorites-view">
      <h1>Mani favorīti</h1>
      <div class="favorites-list">
        <Card v-for="event in favorites" :key="event.id" class="event-card">
          <template #title>{{ event.title }}</template>
          <template #content>
            <p><strong>Datums:</strong> {{ formatDate(event.date) }}</p>
            <p><strong>Vieta:</strong> {{ event.location }}</p>
          </template>
        </Card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Card } from 'primevue/card';
  
  const favorites = ref([
    {
      id: 3,
      title: 'Dabas pārgājiens',
      date: new Date('2025-09-01'),
      location: 'Gaujas nacionālais parks'
    }
  ]);
  
  function formatDate(date) {
    return new Date(date).toLocaleDateString('lv-LV');
  }
  </script>
  
  <style>
  .favorites-view {
    padding: 2rem;
  }
  .favorites-list {
    display: grid;
    gap: 1rem;
  }
  </style>
  