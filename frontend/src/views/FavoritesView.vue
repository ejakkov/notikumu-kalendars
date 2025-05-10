<template>
    <div class="favorites-view">
      <span class="favorites-header">Tavi favorīti</span>
      <div class="favorites-list">
        <div v-for="event in favorites" class="favorites-item">
          <div class="favorites-item-img">
            <img src="../assets/no-image.jpg"/>
          </div>
          <div class="favorites-item-content">
            <span class="favorites-content-header">
              {{ event.title }} 
            </span>
            <span class="favorites-content-description">
              {{ event.description }}
            </span>
            <span class="favorites-content-view">
              <button>Apskatīt</button>
            </span>
          </div>
          <div class="favorites-content-toggle">
            <i class="pi pi-heart"></i>
          </div>
        </div>
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
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur enim eget ante vehicula, ac interdum nisi sodales. Pellentesque ultricies tempor elit, et accumsan ipsum sollicitudin non. Quisque dapibus ullamcorper justo id pellentesque. Phasellus eu commodo tortor. Etiam sed convallis ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur in justo elit. Mauris et maximus urna. Integer semper accumsan metus. Nunc molestie tellus a ligula viverra consequat. Aliquam neque felis, dignissim interdum ante et, iaculis facilisis risus.',
      date: new Date('2025-09-01'),
      location: 'Gaujas nacionālais parks'
    },
    {
      id: 3,
      title: 'Dabas pārgājiens',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur enim eget ante vehicula, ac interdum nisi sodales. Pellentesque ultricies tempor elit, et accumsan ipsum sollicitudin non. Quisque dapibus ullamcorper justo id pellentesque. Phasellus eu commodo tortor. Etiam sed convallis ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur in justo elit. Mauris et maximus urna. Integer semper accumsan metus. Nunc molestie tellus a ligula viverra consequat. Aliquam neque felis, dignissim interdum ante et, iaculis facilisis risus.',
      date: new Date('2025-09-01'),
      location: 'Gaujas nacionālais parks'
    },
    {
      id: 3,
      title: 'Dabas pārgājiens',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur enim eget ante vehicula, ac interdum nisi sodales. Pellentesque ultricies tempor elit, et accumsan ipsum sollicitudin non. Quisque dapibus ullamcorper justo id pellentesque. Phasellus eu commodo tortor. Etiam sed convallis ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur in justo elit. Mauris et maximus urna. Integer semper accumsan metus. Nunc molestie tellus a ligula viverra consequat. Aliquam neque felis, dignissim interdum ante et, iaculis facilisis risus.',
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
    max-width: 1000px;
    margin: auto;
    padding-top: 70px;
    font-family: Calibri;
  }
  .favorites-header{
    font-size: 16pt;
    font-weight: bold;
  }
  .favorites-list {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
  }
  .favorites-item{
    margin: 10px;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #DDD;
    display: flex;
  }
  .favorites-item-img{
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    margin-right: 20px;
  }
  .favorites-item-img img{
    max-width: 120px;
    max-height: 120px;
    border: 1px solid #EEE;
  }
  .favorites-item-content{
    display: flex;
    flex-direction: column;
  }
  .favorites-content-header{
    font-weight: bold;
    margin: 4px 0;
    font-size: 18pt;
  }
  .favorites-content-description{
    color: #888;
    max-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 740px;
  }
  .favorites-content-view button{
    padding: 8px;
    border: 1px solid #444;
    background: #DDD;
    border-radius: 8px;
    margin: 15px 0;
  }
  .favorites-content-toggle{
    flex: 1;
  }
  .favorites-content-toggle i{
    display: block;
    float: right;
    font-size: 24pt;
    cursor: pointer;
  }
  </style>
  