const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profile');
const { router: metricsRoutes } = require('./routes/metrics'); 

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use('/api', authRoutes);
app.use('/api', profileRoutes); 
app.use('/api', metricsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
