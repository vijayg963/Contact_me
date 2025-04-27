var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// Define the Contact schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Email is now unique
  message: { type: String, required: true },
  phone: { type: String, required: false }, // Optional phone field
  createdAt: { type: Date, default: Date.now }
});

// Create the Contact model
const Contact = mongoose.model('Contact', contactSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST route to submit a contact message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("===>",req.body);
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact message submitted successfully!' });
  } catch (error) {
    console.log("ERRROR:-",error);
    res.status(500).json({ error: 'Failed to submit contact message' });
  }
});

// GET route to retrieve all contact messages
router.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contact messages found' });
    }
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve contact messages' });
  }
});

module.exports = router;
