const express = require('express');
const cors = require('cors');
const app = express();
const port = 4201;


app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

app.get('/products', (req, res) => {
    setTimeout(() => {
      res.json(products);
    }, 1000); // 2000 milliseconds = 2 seconds delay
  });


  app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);
    if (product) {
      setTimeout(()=> {res.json(product)},1000);
    } else {
      res.json([])
    }
  });

  app.get('/products/:id/reviews', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const productReviews = reviews.filter(review => review.productId === productId);
    setTimeout(() => {
      res.json(productReviews);
    }, 1000); // 1000 milliseconds = 1 second delay
  });



const reviews = [
    {
        id: 1,
        productId: 10,
        userName: 'jackharkness',
        title: 'Works great',
        text: "I've beat every level faster with this controller"
    },
    {
        id: 2,
        productId: 5,
        userName: 'thor364',
        title: "Didn't work as I expected",
        text: "I summon this hammer, and it does not heed my call"
    },

    {
        id: 3,
        productId: 5,
        userName: 'allthumbs',
        title: "Dangerous!",
        text: "I almost injured myself with this product"
    },
    {
        id: 4,
        productId: 2,
        userName: 'mom42',
        title: 'Great for the kiddos',
        text: 'My kids love to play with this cart'
    },
    {
        id: 5,
        productId: 5,
        userName: 'theoden',
        title: 'Now for wrath. Now for ruin',
        text: 'This hammer (and a dinner bell) worked even better than a horn for drawing attention'
    },
    {
        id: 6,
        productId: 5,
        userName: 'glamdring',
        title: 'This was no foe-hammer',
        text: 'Product was much smaller than expected'
    },
    {
        id: 7,
        productId: 10,
        userName: 'grima',
        title: 'Nothing but a herald of woe',
        text: 'I played no better with this controller than my old one'
    },
    {
        id: 8,
        productId: 1,
        userName: 'hama',
        title: 'Has no evil purpose',
        text: 'This rake is worthy of honor'
    },
    {
        id: 9,
        productId: 1,
        userName: 'hama',
        title: 'More than a tool',
        text: 'The rake in the hand of a wizard may be more than a tool for the garden'
    },
    {
        id: 10,
        productId: 1,
        userName: 'eowyn',
        title: 'A necessity!',
        text: 'Those without rakes can still die upon them'
    }
];

const products = [
    {
      id: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      description: 'Leaf rake with 48-inch wooden handle',
      price: 19.95,
      quantityInStock: 15,
      hasReviews: true
    },
    {
      id: 2,
      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      quantityInStock: 2,
      hasReviews: true
    },
    {
      id: 5,
      productName: 'Hammer',
      productCode: 'TBX-0048',
      description: 'Curved claw steel hammer',
      price: 8.9,
      quantityInStock: 8,
      hasReviews: true
    },
    {
      id: 8,
      productName: 'Saw',
      productCode: 'TBX-0022',
      description: '15-inch steel blade hand saw',
      price: 11.55,
      quantityInStock: 6,
      hasReviews: false
    },
    {
      id: 10,
      productName: 'Video Game Controller',
      productCode: 'GMG-0042',
      description: 'Standard two-button video game controller',
      price: 35.95,
      quantityInStock: 12,
      hasReviews: true
    }
  ];