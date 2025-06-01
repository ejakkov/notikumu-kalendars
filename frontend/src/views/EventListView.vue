<template>
  <div class="filters">
    <div class="filters-dropdowns">
      <Dropdown v-model="selectedCategory" :options="categories" placeholder="Kategorija" />
      <Dropdown v-model="selectedLocation" :options="locations" placeholder="Atrašanās vieta" />
    </div>
    <input v-model="search" placeholder="Meklēt notikumu..." />
  </div>
  <div class="event-list-view">
    <div v-if="events.length === 0" class="loading">
      <p>Loading events...</p>
    </div>
    <div v-else class="event-list">
      <router-link
        v-for="event in filteredEvents"
        :key="event._id"
        :to="{ name: 'EventDetail', params: { id: event._id } }"
        class="event-card"
        style="text-decoration: none; color: inherit;">
        <img class="card-image" :src="event.image" alt="Event image" />
        <p class="date-category">{{ formatDate(event.date) }} - {{ event.category }}</p>
        <div class="title">{{ event.title }}</div>
        <div class="content">
          <p><img src="../assets/compass.png" class="location-icon" />{{ event.location }}</p>
          <p>{{ event.description }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { InputText } from 'primevue/inputtext';
import axios from 'axios';
import { Card } from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';

const search = ref('');
const selectedCategory = ref(null);
const selectedLocation = ref(null);
const events = ref([
  {
    _id: "1",
    title: 'J. Purviņa personīgā izstāde',
    date: new Date('2025-08-18'),
    location: 'Rīga',
    coord: "56.955863341387456,24.11307274793148",
    description: 'Autora mākslas darbi.',
    category: 'Izstāde',
    image: 'https://www.jurmala.lv/sites/jurmala/files/styles/article_full_image_665x375_/public/gallery_images/buss.jpg?itok=hJOJ1mgs'
  },
  {
    _id: "2",
    title: 'Jūrmalas svētki',
    date: new Date('2025-07-10'),
    location: 'Jūrmala',
    coord: "56.97490021890809,23.785740410344083",
    description: 'Pludmales pasākums.',
    category: 'Pilsētas svētki',
    image: 'https://media.timeout.com/images/106204051/1920/1440/image.webp'
  },
  {
    _id: "3",
    title: 'Rīgas svētki',
    date: new Date('2025-08-18'),
    location: 'Rīga',
    coord: "56.950661761004135,24.099500920220976",
    description: 'Koncerti un salūts centrā.',
    category: 'Pilsētas svētki',
    image: 'https://pbs.twimg.com/profile_images/1013769074860527618/zzRcZHCP_400x400.jpg'
  },
  {
    _id: "4",
    title: 'Ezotēriskā sirošana',
    date: new Date('2025-07-10'),
    location: 'Jūrmala',
    coord: "56.96258765268574,23.662395568962662",
    description: 'Dzintaru un kristālu meklēšana.',
    category: 'Veselība',
    image: 'https://f11.pmo.ee/VMxu1GB7q7y_3FZcZZv-2dN5M7E=/685x0/filters:focal(0x1171:1440x1921):format(webp)/nginx/o/2020/05/16/13104693t1ha705.jpg'
  },
  {
    _id: "5",
    title: 'Jumprava koncerts',
    date: new Date('2025-06-07'),
    location: 'Rīga',
    coord: "56.96367138578049,24.092444221622628",
    description: 'Šlesers sponsorē koncertu!',
    category: 'Koncerts',
    image: 'https://f7.pmo.ee/dwsWF6UtvXzcPcujcV2mCsC1HR0=/1442x0/filters:format(webp)/nginx/o/2025/04/03/16752735t1h3ba6.jpg'
  },
  {
    _id: "6",
    title: 'Valmieras svētki',
    date: new Date('2025-07-25'),
    location: 'Valmiera',
    coord: "57.53111999516135,25.408382745636324",
    description: 'Valmieras pilsētas svētki',
    category: 'Pilsētas svētki',
    image: 'https://valmierasvin.lv/wp-content/uploads/2025/02/Valmieras-pilsetas-svetki-2025-01-960x720.jpg'
  },
  {
    _id: "7",
    title: 'Rudens Ritmi',
    date: new Date('2025-09-13'),
    location: 'Cēsis',
    coord: "56.99574280177911,25.261367837432942",
    description: 'Savvaļas kulinārais festivāls.',
    category: 'Festivāls',
    image: 'https://i0.wp.com/www.cesis2025.lv/wp-content/uploads/2022/09/486117355_1139187134671395_8135691930778064616_n-scaled.jpg?resize=1536%2C674&ssl=1'
  },
  {
    _id: "8",
    title: 'Dzejas dienas Daugavpilī',
    date: new Date('2025-09-05'),
    location: 'Daugavpils',
    coord: "55.875238,26.516922",
    description: 'Publiski dzejas lasījumi un performances.',
    category: 'Literatūra',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Daugavpils_museum.jpg'
  },
  {
    _id: "9",
    title: 'Senās mūzikas vakars',
    date: new Date('2025-06-15'),
    location: 'Kuldīga',
    coord: "56.966224,21.968605",
    description: 'Baroka mūzikas koncerts brīvdabā.',
    category: 'Koncerts',
    image: 'https://static.lsm.lv/media/2021/07/large/1/fo2x.jpg'
  },
  {
    _id: "10",
    title: 'Zaļumballe pie ezera',
    date: new Date('2025-07-20'),
    location: 'Alūksne',
    coord: "57.425895,27.053459",
    description: 'Dejas, mūzika un ugunskurs pie Alūksnes ezera.',
    category: 'Balle',
    image: 'https://enciklopedija.lv/api/image/thumbnail?name=4e550aacbb37-dd5d9d5c-b541-4cba-9591-626e5e3e61cd.jpg&size=inline'
  },
  {
    _id: "11",
    title: 'Salaspils vasaras kino',
    date: new Date('2025-08-03'),
    location: 'Salaspils',
    coord: "56.860379,24.350141",
    description: 'Bezmaksas āra kino vakars pie botāniskā dārza.',
    category: 'Kino',
    image: 'https://www.openaircinema.us/cdn/shop/products/25_-Elite-Screen-Rear-Projection_Garbo.jpg?v=1605198952'
  },
  {
    _id: "12",
    title: 'Deju svētku afterparty',
    date: new Date('2025-07-11'),
    location: 'Rīga',
    coord: "56.98471097346947,24.157067542759034",
    description: 'Deju kolektīvu uzstāšanās stāvvietā pie Mežaparka.',
    category: 'Koncerts',
    image: 'https://bauskasdzive.lv/wp-content/uploads/2025/05/4c2bbbd403369a33f61350ec1fb571cc-1024x703.jpg'
  },
  {
    _id: "13",
    title: 'Jēkabpils mākslas plenērs',
    date: new Date('2025-07-05'),
    location: 'Jēkabpils',
    coord: "56.508149767235444,25.858372094412452",
    description: 'Mākslinieki strādā dabā un izstāda darbus uz vietas.',
    category: 'Izstāde',
    image: 'https://motivs.lv/images/tuff/103093_02.jpg'
  },
  {
    _id: "14",
    title: 'Talsu amatnieku tirgus',
    date: new Date('2025-06-22'),
    location: 'Talsi',
    coord: "57.244353,22.590452",
    description: 'Roku darbs, meistarklases un koncerti.',
    category: 'Tirgus',
    image: 'https://zinas.nra.lv/_mm/photos/2022-06/860px/566649_af7de0bafe.jpg'
  },
  {
    _id: "15",
    title: 'Ogres gaismas festivāls',
    date: new Date('2025-11-15'),
    location: 'Ogre',
    coord: "56.816820,24.611017",
    description: 'Gaismas instalācijas un interaktīvi objekti.',
    category: 'Festivāls',
    image: 'https://maminuklubs.lv/media/cache/31/d7/31d75448afe0a263642dbe1a86cfbe4c.jpg'
  },
  {
    _id: "16",
    title: 'Liepājas pludmales joga',
    date: new Date('2025-07-12'),
    location: 'Liepāja',
    coord: "56.49878365450278,20.9929824628903",
    description: 'Bezmaksas joga saullēktā pie jūras.',
    category: 'Veselība',
    image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/be/2d/fd.jpg'
  },
  {
    _id: "17",
    title: 'Bauskas velosvētki',
    date: new Date('2025-08-24'),
    location: 'Bauska',
    coord: "56.407008,24.199165",
    description: 'Velobrauciens, aktivitātes bērniem un izloze.',
    category: 'Sports',
    image: 'https://scontent.frix5-1.fna.fbcdn.net/v/t39.30808-6/493945770_1271285668332916_2025786850198434337_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=vmW1tekNcMoQ7kNvwG47p8U&_nc_oc=Adl1YwcY8sNdJJUtMpvkGUmPdpENqCsVWL_dQZ-q4QNcahZMJfqbEG32aSzrNkF1m93H40NT_9RIKxDh1zj73U8w&_nc_zt=23&_nc_ht=scontent.frix5-1.fna&_nc_gid=r1-wuy_QjNRFOWrA2wcmBQ&oh=00_AfIFvCU1EtEXiZgfLyq7ePTaHnu7-AdjxheToo9txTcREg&oe=68411BC9'
  },
  {
    _id: "18",
    title: 'Līvānu upes svētki',
    date: new Date('2025-07-19'),
    location: 'Līvāni',
    coord: "56.35520250357635,26.16067958607486",
    description: 'Laivu parāde, koncerti un sporta aktivitātes pie Daugavas.',
    category: 'Pilsētas svētki',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoIIKYDOcAfzuvhh0hqvu9pAi4sGBdwmtCpA&s'
  },
  {
    _id: "19",
    title: 'Gaujas pludmales vakars',
    date: new Date('2025-08-09'),
    location: 'Sigulda',
    coord: "57.15954794745347,24.835752287803775",
    description: 'Dabas koncerts Gaujas pludmalē.',
    category: 'Koncerts',
    image: 'https://tourism.sigulda.lv/wp-content/uploads/2021/06/Baltic-Pictures-VS-3948_siguldas_pludmale-scaled.jpg?lang=en'
  },
  {
    _id: "20",
    title: 'Ludzas senatnes dienas',
    date: new Date('2025-07-26'),
    location: 'Ludza',
    coord: "56.54923258593215,27.728535863781946",
    description: 'Viduslaiku tirgus un bruņinieku turnīrs pilsdrupās.',
    category: 'Festivāls',
    image: 'https://www.njherald.com/gcdn/authoring/2019/09/12/NNJH/ghows-TH-68814e43-d715-42a9-8082-1e7c20345fdf-1d78bc4b.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp'
  }
]);

// These will be populated from the events data
const categories = computed(() => {
  const uniqueCategories = [...new Set(events.value.map(event => event.category))];
  return uniqueCategories.sort();
});

const locations = computed(() => {
  const uniqueLocations = [...new Set(events.value.map(event => event.location))];
  return uniqueLocations.sort();
});

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    const matchesSearch = !search.value || 
      event.title.toLowerCase().includes(search.value.toLowerCase()) ||
      event.description.toLowerCase().includes(search.value.toLowerCase());
    
    const matchesCategory = !selectedCategory.value || 
      event.category === selectedCategory.value;
    
    const matchesLocation = !selectedLocation.value || 
      event.location === selectedLocation.value;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });
});

// Comment out the API call for now since we're using local data
// onMounted(async () => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/event/list', {
//       token: localStorage.getItem("authToken")
//     });
//     events.value = response.data;
//   } catch (error) {
//     console.error('Error loading events:', error);
//   }
// });

function formatDate(date) {
  return new Date(date).toLocaleDateString('lv-LV');
}
</script>

<style scoped>
.filters-dropdowns {
  display: flex;
  gap: 20px;
}

/* Updated styles for dropdowns */
:deep(.p-dropdown) {
  min-width: 200px;
  border-radius: 8px;
  border: 2px solid rgb(10, 99, 10);
  background: white;
}

:deep(.p-dropdown:not(.p-disabled).p-focus) {
  box-shadow: 0 0 0 2px rgba(10, 99, 10, 0.2);
  border-color: rgb(15, 149, 15);
}

:deep(.p-dropdown .p-dropdown-label) {
  padding: 10px 12px;
  font-size: 14px;
  color: rgb(10, 99, 10);
  font-family: 'Roboto Slab', serif;
}

:deep(.p-dropdown .p-dropdown-trigger) {
  padding: 0 12px;
  color: rgb(10, 99, 10);
}

:deep(.p-dropdown-panel) {
  background: white;
  border: 2px solid rgb(10, 99, 10);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.p-dropdown-panel .p-dropdown-items) {
  padding: 0;
}

:deep(.p-dropdown-panel .p-dropdown-item) {
  padding: 10px 12px;
  font-size: 14px;
  color: rgb(10, 99, 10);
  font-family: 'Roboto Slab', serif;
  transition: all 0.2s ease;
}

:deep(.p-dropdown-panel .p-dropdown-item:hover) {
  background: rgba(10, 99, 10, 0.1);
}

:deep(.p-dropdown-panel .p-dropdown-item.p-highlight) {
  background: rgba(10, 99, 10, 0.2);
  color: rgb(10, 99, 10);
}

.loading {
  text-align: center;
  padding: 20px;
}

.date-category {
  font-size: 0.9rem;
  color: #888;
  letter-spacing: 1px;
}

input {
  height: 100%;
  padding: 8px 12px;
  border: 2px solid rgb(10, 99, 10);
  border-radius: 8px;
  font-family: 'Roboto Slab', serif;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: rgb(15, 149, 15);
  box-shadow: 0 2px 8px rgba(10, 99, 10, 0.2);
}

.filters {
  align-items: center;
  height: 50px;
  width: 95%;
  border-bottom: 1px solid #ccc;
  justify-self: center;
  padding: 10px;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
}

.location-icon {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.event-list-view {
  padding: 20px;
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
  margin: 10px 0;
}

.event-card .content p {
  margin: 5px 0;
  color: #555;
}

.card-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
}

@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');

:root {
  font-family: 'Roboto Slab', serif;
}
</style>