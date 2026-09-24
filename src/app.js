const express = require("express")
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();


const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json())

app.use('/api/tasks', taskRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});