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
      :src=mapLink
      width="100%"
      height="300"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
  <div v-else class="event-detail">
    <p>Event not found</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { inject, ref, computed, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const id = route.params.id;
var isLoggedIn = inject('isLoggedIn');

// Use the same events data as in EventListView
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

const event = computed(() => events.value.find(e => e._id === id));

function favoriteEvent(eventId) {
  if (!isLoggedIn.value) {
    alert('Please log in to favorite events');
    return;
  }

  const token = localStorage.getItem("authToken");
  if (!token) {
    alert('Please log in to favorite events');
    return;
  }

  axios.post('http://localhost:5000/api/event/favorite', {
    event: eventId,
    token: token
  })
  .then((response) => {
    const eventToUpdate = events.value.find(e => e._id === eventId);
    if (eventToUpdate) {
      eventToUpdate.isFavorite = !eventToUpdate.isFavorite;
    }
  })
  .catch((error) => {
    console.error('Error toggling favorite:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      alert('Your session has expired. Please log in again.');
      isLoggedIn.value = false;
      localStorage.removeItem("authToken");
    } else {
      alert('Failed to update favorite status. Please try again.');
    }
  });
}

// Add function to check favorite status on load
onMounted(async () => {
  if (isLoggedIn.value && event.value) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      isLoggedIn.value = false;
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/event/favorite/check', {
        event: event.value._id,
        token: token
      });
      const eventToUpdate = events.value.find(e => e._id === event.value._id);
      if (eventToUpdate) {
        eventToUpdate.isFavorite = response.data.isFavorite;
      }
    } catch (error) {
      console.error('Error checking favorite status:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        isLoggedIn.value = false;
        localStorage.removeItem("authToken");
      }
    }
  }
});

function formatDate(date) {
  return new Date(date).toLocaleDateString('lv-LV');
}

const mapLink = computed(() => {
  if (!event.value) return '';
  const coord = event.value.coord;
  return `https://www.google.com/maps?q=${coord}&output=embed`;
});
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