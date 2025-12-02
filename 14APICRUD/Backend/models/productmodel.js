import sql from '../config/dbconfig.js';

class Product{
    constructor(product){
        this.categoryId = product.categoryId;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
    }

    //Vamos a crear un producto
    static create(newProduct, result){
        if(newProduct.categoryId && newProduct.name && newProduct.id){
            sql.query('INSERT INTO products VALUES(?,?,?,?,?)', 
                    newProduct(newProduct.id, newProduct.categoryId, newProduct.name, newProduct.price, newProduct.stock),
                (err, res) => {
                    if(err){
                        console.log('Error al crear al producto ', err);
                        result(err, null);
                        return;
                    }

                    console.log('Producto creado exitosamente ', {id:res.insertId, ...newProduct});
                    result(null, {id: res,insertId, ...newProduct});
                });
        } 
    }
}

export default Product;