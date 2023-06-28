const express = require('express');
const mongoose = require('mongoose');

// Create an Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:sEJ02UxCRU2u3I1t@cluster0.xaaoyzn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the referral schema
const referralSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  mobile: String,
  address1: String,
  address2: String,
  suburb: String,
  state: String,
  postcode: String,
  country: String,

});
const Referral = mongoose.model('Referral', referralSchema);

// Create a new referral
app.post('/referrals', async (req, res) => {
  try {
    const referral = new Referral(req.body);
    await referral.save();
    res.status(201).json(referral);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create referral' });
  }
});

// Get all referrals
app.get('/referrals', async (req, res) => {
  try {
    const referrals = await Referral.find();
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve referrals' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});