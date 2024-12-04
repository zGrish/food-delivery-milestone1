const express = require('express');
const cron = require('node-cron');

const app = express();
app.use(express.json());

let menuItems = [];
let orders = [];

// endpoint for post Menu 
app.post('/menu', (req, res) => {
    const { name, price, category } = req.body;

    if (price <= 0 || !['main', 'side', 'drink'].includes(category)) {
        return res.status(400).send('Invalid menu item data.');
    }

    const newItem = { id: menuItems.length + 1, name, price, category };
    menuItems.push(newItem);
    res.status(201).send(newItem);
});

// endpoint get Menu 
app.get('/menu', (req, res) => {
    res.status(200).send(menuItems);
});

// order endpoint for POSt
app.post('/orders', (req, res) => {
    const { items } = req.body;

    const valid = items.every(id => menuItems.find(item => item.id === id));
    if (!valid) {
        return res.status(400).send('Invalid item ID(s).');
    }

    const newOrder = {
        id: orders.length + 1,
        items,
        status: 'Preparing',
    };
    orders.push(newOrder);
    res.status(201).send(newOrder);
});

// order endpoint for get
app.get('/orders/:id', (req, res) => {
    const order = orders.find(order => order.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).send('Order not found.');
    }
    res.status(200).send(order);
});

// CRON Job
cron.schedule('*/1 * * * *', () => {
    orders.forEach(order => {
        if (order.status === 'Preparing') {
            order.status = 'Out for Delivery';
        } else if (order.status === 'Out for Delivery') {
            order.status = 'Delivered';
        }
    });
    console.log('Order statuses updated.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});