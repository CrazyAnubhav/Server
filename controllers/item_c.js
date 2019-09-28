let item_model = require('../models/item_m')

module.exports = {
select_all: async (req, res)=>{// Get all items
    try {
        console.log("For Debug")
        console.log(req)
        let items = await item_model.find().exec()
        res.send(items)
    } catch(err) {
        console.log("For Debug")
        console.log(req)
        res.status(500).send(err)
    }
},
records_in_table_form: async (req, res)=>{// Get all items & List in HTML Table
    try {
        let items = await item_model.find().exec()
        let html = '<h1>item List</h1><table border="1" cellspacing="0" cellpadding="5"><tr><th>SrNo</th><th>_id</th><th>Item Name</th><th>Description</th><th>image_name</th><th>Cost</th></tr>'
        let serial_no = 1
        items.forEach((record)=>{
            html += `<tr><td>${serial_no}</td><td>${record._id}</td><td>${record.item_name}</td><td>${record.description}</td><td>${record.image_name}</td><td>${record.cost}</td></tr>`
            serial_no++
        })
        html += '</table>'
        res.send(html)
    } catch(err) {
        res.status(500).send(err)
    }
},
select1_by_id: async (req, res)=>{// Get a selected item
    try {
        let item = await item_model.findById(req.params.id).exec()
        res.send(item)
    } catch(err) {
        res.status(500).send(err)
    }
},
insert: async(req, res)=>{// Save an item Record
    try {
        console.log(req.body)
        let item   = new item_model(req.body)
        let result = await item.save()
        res.send(result)
    } catch(err) {
        res.status(500).send(err)
    }
},
delete1: async(req,res)=>{// Delete an item Record
    try {
        let result = await item_model.deleteOne({_id: req.params.id}).exec()
        res.send(result)
    } catch(err) {
        res.status(500).send(err)
    }
}
}