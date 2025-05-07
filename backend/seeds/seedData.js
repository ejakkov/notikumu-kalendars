const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Event = require('../models/event');
const Favorite = require('../models/Favorite');
const Reminder = require('../models/reminder');

// Pievienojies datubāzei
mongoose.connect("mongodb://localhost:27017/notikumukalendars", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seedData() {
  await mongoose.connection.dropDatabase();

  // ✅ Lietotāji
  const parole1 = await bcrypt.hash('parole123', 10);
  const parole2 = await bcrypt.hash('admin321', 10);

  const users = await User.insertMany([
    { name: 'Jānis Bērziņš', email: 'janis@example.com', password: parole1, isAdmin: false },
    { name: 'Anna Kalniņa', email: 'anna@example.com', password: parole2, isAdmin: true }
  ]);

  console.log('✅ Lietotāji pievienoti');

  // 📅 Pasākumi
  const events = await Event.insertMany([
    {
      title: 'Rīgas svētki',
      date: new Date('2025-08-18'),
      time: '18:00',
      location: '11. novembra krastmala, Rīga',
      category: 'Kultūra',
      description: 'Gada lielākie svētki Rīgā ar koncertiem un salūtu.',
      price: 0,
      sourceUrl: 'https://www.rigassvetki.lv'
    },
    {
      title: 'Jūrmalas mūzikas festivāls',
      date: new Date('2025-07-15'),
      time: '20:00',
      location: 'Dzintaru koncertzāle, Jūrmala',
      category: 'Mūzika',
      description: 'Starptautisks mūzikas festivāls ar populāriem māksliniekiem.',
      price: 25.00,
      sourceUrl: 'https://www.jurmala.lv/festivals'
    }
  ]);

  console.log('📅 Pasākumi pievienoti');

  // ⭐ Favorīti
  await Favorite.insertMany([
    { user: users[0]._id, event: events[0]._id },
    { user: users[1]._id, event: events[1]._id }
  ]);

  console.log('⭐ Favorīti pievienoti');

  // 🔔 Atgādinājumi
  await Reminder.insertMany([
    {
      user: users[0]._id,
      event: events[0]._id,
      method: 'email',
      remindAt: new Date('2025-08-17T09:00:00Z')
    },
    {
      user: users[1]._id,
      event: events[1]._id,
      method: 'browser',
      remindAt: new Date('2025-07-14T18:00:00Z')
    }
  ]);

  console.log('🔔 Atgādinājumi pievienoti');

  mongoose.disconnect();
}

seedData().catch(err => {
  console.error('❌ Kļūda sēklošanā:', err);
  mongoose.disconnect();
});
