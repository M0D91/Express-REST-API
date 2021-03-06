const router =  require("express").Router()
const storage = require("../libs/storage")
const fileupload = require("express-fileupload")

router.use(fileupload())

router.get("/upload", (req, res)=>{
    res.sendFile(__dirname + "/plantillaSubida.html")
})

router.post("/upload", (req, res)=> {
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files uploaded.")
    }

    let file = req.files.foto //foto debe ser el campo nombre del input field en el form
    
    // console.log("Me enviaron " + req.files.foto.name);
    // console.log("Me enviaron " + req.files.OtraFoto.name);

    file.mv(`${storage}/${file.name}`, err => {
        if (err) {
            console.log(err)
            return res.status(500).send({
                message : `Error during saving process: ${err}`
            })
        }

        // res.redirect("/a")
        const time = new Date()
        return res.status(200).send({
            message : "Upload successfully.",
            date: `${time.toDateString()}, ${time.getHours()}:${time.getMinutes()}`
        })
    })
    
})

module.exports = router