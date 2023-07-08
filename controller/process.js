const Product = require('../model/model')




exports.process = (req, res) => {
    res.render('editing', { editing: false })
}

// Adding a Product (Create)
exports.items = (req, res) => {
    const product = new Product(req.body.title, req.body.price, req.body.description)
    product.save()
        .then((result) => {
            //    console.log(result)
            console.log("Added Product")
            res.redirect('/products')
        }).catch(err => console.log(err));
}

// Reading A Single Product (Read)
exports.getProduct = (req, res) => {
    const prodId = req.params.productId
    // Product.findAll({where:{id:prodId}}).then(product=>{
    //   res.render('details',{product:product[0]})}).catch(err=>console.log(err))
    Product.findById(prodId).then(product => {
        res.render('details', { product: product })
    }).catch(err => console.log(err))
}

// Reading All Product (Read)
exports.output = (req, res) => {
    Product.fetchAll().then((row) => {
        res.render('products', { products: row, editing: false })
    })
        .catch(err => console.log(err))

}


// Editing A product(Update) 
// it is used for posting editing details in databse
exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId
    const updateTitle = req.body.title
    const updatedPrice = req.body.price
    const updatedDesc = req.body.description
    const product = new Product(updateTitle, updatedPrice, updatedDesc, prodId, null, req.user._id);
    product.save()
        .then(result => {
            console.log("Updated...")
            res.redirect('/products')
        })
        .catch(err => console.log(err))

}

// When user click on edit this will showed to user and helps it to edit page 
// it is used for get
exports.editProduct = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('editing', {
                editing: editMode,
                product: product
            })
        }).catch(err => console.log(err))

}


// // Deleting A product(Delete)
exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId
    Product.deleteById(prodId).then(() => {
        console.log("Product Deleted")
        res.redirect('/products')
    })
        .catch(err => console.log(err))
}

// Cart Side

exports.getCarts = (req, res) => {
    req.user
        .getCart()
        .then(products => {

            res.render('cart', { products: products })
        })
        .catch(err => {
            console.log(err)
        })
        .catch(err => {
            console.log(err)
        })
}


exports.postcart = (req, res) => {
    const prodId = req.body.productId
    Product.findById(prodId).then(product => {
        return req.user.addToCart(product)
    }).then(result => {
        res.redirect('/cart')
        console.log(result)
    })
}


exports.postcartdelete = (req, res) => {
    const prodId = req.body.productId
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => { console.log(err) })

}


// Order Side

exports.postOrder = (req, res) => {
    let fetchedCart;
    req.user
       .addOrder()
        .then(() => {
            res.redirect('/order')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getOrders = (req, res) => {
    req.user
        .getOrders()
        .then(orders => {
            res.render('order', {
                orders: orders
            })
        })
        .catch(err => console.log(err))
    // res.render('order')
}