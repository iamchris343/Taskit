const express = require("express")
const dotenv = require('dotenv');
const connectDB = require('./db');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use('/api/Tasks', taskRoutes);

app.listen(PORT, ()=>{
    console.log(`Taskit Up and running sir HTTP://localhost:${PORT}`)
} )