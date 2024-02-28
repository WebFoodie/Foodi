const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 6001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB configuration using mongoose
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-client.mtdws7f.mongodb.net/demo-foodi-client`,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
    console.log("MongoDB Connected Successfully!");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Import routes
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');

app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
