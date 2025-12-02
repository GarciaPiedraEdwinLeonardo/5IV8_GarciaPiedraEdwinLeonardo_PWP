import Product from "../models/productmodel";

export const create = (req,res) => {
    let categoryId = req.body.categoryId;
    if(!req.body.name || (!isNaN(parseInt(categoryId)) && categoryId === 0)){
        res.status(400).send({
            message: 'El nombre del producto y la categoria no puede estar vacia'
        })
    }
}