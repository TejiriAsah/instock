const express = require('express');
let warehouses = require('../data/warehouses.json');
const warehouseRouter = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

//get warehouse route
warehouseRouter.get('/', (_req, res) => res.json({ warehouses }));

//get single warehouse route
warehouseRouter.get('/:id', (req, res) => {
  const currWarehouseId = req.params.id;
  const currWarehouse = warehouses.find(
    (warehouse) => warehouse.id === currWarehouseId
  );
  res.status(200).json(currWarehouse);
});

//put warehouse route
findIndex = (warehouses, id) => {
  for (let i = 0; i < warehouses.length; i++) {
    if (warehouses[i].id === id) {
      return i;
    }
  }

  return -1;
};

warehouseRouter.put('/:id', (req, res) => {
  const index = findIndex(warehouses, req.params.id);
  if (index === -1) {
    return res
      .status(404)
      .json({ message: 'warehouse with that ID not found' });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Request body missing' });
  }

  if (Object.keys(req.body).length !== 0 && !checkWarehouseKeys(req.body)) {
    return res
      .status(400)
      .json({ message: 'Request body must have ALL FIELDS ' });
  }

  fs.readFile('./data/warehouses.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.log('File read failed:', err);
      return;
    }
    const jsonObject = JSON.parse(jsonString);
    const editedWarehouse = req.body;
    editedWarehouse.id = req.params.id;
    jsonObject[index] = editedWarehouse;
    const newJson = JSON.stringify(jsonObject, null, '\t');

    fs.writeFile('./data/warehouses.json', newJson, (err) => {
      if (err) {
        console.log('Error writing file', err);
      } else {
        console.log('Successfully wrote file');
      }
    });
  });

  return res.status(200).json({ message: 'warehouse has been updated!' });
});

//post new warehouse route
warehouseRouter.post('/', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Request body missing' });
  }

  if (Object.keys(req.body).length !== 0 && !checkWarehouseKeys(req.body)) {
    return res
      .status(400)
      .json({ message: 'Request body must have ALL FIELDS ' });
  }
  const newWarehouse = {
    id: uuidv4(),
    ...req.body,
  };

  fs.readFile('./data/warehouses.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.log('File read failed:', err);
      return;
    }
    const jsonObject = JSON.parse(jsonString);
    jsonObject.push(newWarehouse);
    const newJson = JSON.stringify(jsonObject, null, '\t');

    fs.writeFile('./data/warehouses.json', newJson, (err) => {
      if (err) {
        console.log('Error writing file', err);
      } else {
        console.log('Successfully wrote file');
      }
    });
  });

  res.status(201).json(newWarehouse);
});

function checkWarehouseKeys(warehouseObj) {
  return (
    warehouseObj.name &&
    warehouseObj.address &&
    warehouseObj.city &&
    warehouseObj.country &&
    warehouseObj.contact &&
    warehouseObj.contact.name &&
    warehouseObj.contact.position &&
    warehouseObj.contact.phone &&
    warehouseObj.contact.email
  );
}

//delete warehouse route
warehouseRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deleted = warehouses.find((warehouse) => warehouse.id === id);
  if (deleted) {
    fs.readFile('./data/warehouses.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log('File read failed:', err);
        return;
      }
      const jsonObject = JSON.parse(jsonString);
      const filteredWarehouses = jsonObject.filter(
        (warehouse) => warehouse.id !== id
      );
      const newJson = JSON.stringify(filteredWarehouses, null, '\t');
      fs.writeFile('./data/warehouses.json', newJson, (err) => {
        if (err) {
          console.log('Error writing file', err);
        } else {
          console.log('Successfully wrote file');
        }
      });
    });
    res.status(200).json(deleted);
  } else {
    res.status(404).json({ message: 'warehouse not found' });
  }
});

module.exports = warehouseRouter;
