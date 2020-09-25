const express = require('express');
const cors = require('cors');
const app = express();

const warehouseRoutes = require('./routes/warehouseRoutes.js');
const inventoryRoutes = require('./routes/inventoryRoutes.js');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/inventories', inventoryRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Successfully started listening on Port: ${PORT}`);
});