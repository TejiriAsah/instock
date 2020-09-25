const express = require('express');
const inventoryRouter = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const warehouses = require('../data/warehouses.json');
let inventoryData = require('../data/inventories.json');

inventoryRouter.get('/', (req, res) => res.json({ inventoryData }));

inventoryRouter.get('/products/:productId', (req, res) => {
  const currProductId = req.params.productId;
  const currProduct = inventoryData.find(
    (product) => product.id === currProductId
  );

  if (!currProduct) {
    res.status(404).send('Product not found!');
  }
  res.status(200).send(currProduct);
});

//put inventory route
findIndex = (inventories, id) => {
  for (let i = 0; i < inventories.length; i++) {
    if (inventories[i].id === id) {
      return i;
    }
  }

  return -1;
};

inventoryRouter.put('/products/:id', (req, res) => {
  const index = findIndex(inventoryData, req.params.id);
  if (index === -1) {
    return res
      .status(404)
      .json({ message: 'inventory with that ID not found' });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Request body missing' });
  }

  if (Object.keys(req.body).length !== 0 && !checkInvKeys(req.body)) {
    return res
      .status(400)
      .json({ message: 'Request body must have ALL FIELDS ' });
  }

  fs.readFile('./data/inventories.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.log('File read failed:', err);
      return;
    }
    const jsonObject = JSON.parse(jsonString);
    const editedInventory = req.body;
    editedInventory.id = req.params.id;
    jsonObject[index] = editedInventory;
    const newJson = JSON.stringify(jsonObject, null, '\t');

    fs.writeFile('./data/inventories.json', newJson, (err) => {
      if (err) {
        console.log('Error writing file', err);
      } else {
        console.log('Successfully wrote file');
      }
    });
  });

  return res.status(200).json({ message: 'inventory has been updated!' });
});
function checkInvKeys(inventoryObj) {
  return (
    inventoryObj.warehouseName &&
    inventoryObj.itemName &&
    inventoryObj.description &&
    inventoryObj.category &&
    inventoryObj.status &&
    (inventoryObj.quantity || inventoryObj.quantity === 0)
  );
}

//post route
inventoryRouter.post('/', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Request body missing' });
  }

  if (Object.keys(req.body).length !== 0 && !checkInvKeys(req.body)) {
    console.log(req.body);
    return res
      .status(400)
      .json({ message: 'Request body must have ALL FIELDS' });
  }

  const warehouse = warehouses.find(
    (warehouse) => warehouse.name === req.body.warehouseName
  );
  if (!warehouse) {
    return res
      .status(404)
      .json({ message: 'Warehouse with given name not found' });
  }
  const inventory = inventoryData.find(
    (inventory) =>
      inventory.itemName === req.body.itemName &&
      inventory.warehouseName === req.body.warehouseName
  );
  if (inventory) {
    return res.status(400).json({ message: 'Item already exists' });
  }

  const newInventory = {
    warehouseID: warehouse.id,
    ...req.body,
  };

  fs.readFile('./data/inventories.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.log('File read failed:', err);
      return;
    }
    const jsonObject = JSON.parse(jsonString);
    jsonObject.push(newInventory);
    const newJson = JSON.stringify(jsonObject, null, '\t');

    fs.writeFile('./data/inventories.json', newJson, (err) => {
      if (err) {
        console.log('Error writing file', err);
      } else {
        console.log('Successfully wrote file');
      }
    });
  });

  return res.status(201).json({ newInventory });
});

inventoryRouter.get('/categories', (req, res) => {
  const categories = inventoryData.reduce((acc, curr) => {
    if (acc.findIndex(category => category.name === curr.category) === -1) {
      acc.push({
        id: uuidv4(),
        name: curr.category
      })
    }
    return acc;
  }, []);

  res.status(200).json({categories});
});

inventoryRouter.delete('/:id', (req, res) => {
  const index = inventoryData.findIndex(item => item.id === req.params.id)
  if (index !== -1) {
    inventoryData = inventoryData.filter(item => item.id !== req.params.id);

    fs.readFile('./data/inventories.json', 'utf8', (err, jsonString) => {
      if (err) {
        console.log('File read failed:', err);
        return;
      }
      const jsonObject = inventoryData;
      const newJson = JSON.stringify(jsonObject, null, '\t');
  
      fs.writeFile('./data/inventories.json', newJson, (err) => {
        if (err) {
          console.log('Error writing file', err);
        } else {
          console.log('Successfully wrote file');
        }
      });
    });
  } else {
    return res.status(404).send({error: 'ID not found'});
  }

  return res.status(200).json({message: 'Successful deletion'});
});

module.exports = inventoryRouter;
