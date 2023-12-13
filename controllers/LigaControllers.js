import Liga from "../models/LigaModels.js";
import path from "path";
import fs from "fs";

export const getLiga = async (req, res) => {
    try {
        const response = await Liga.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const getLigabyID = async (req, res) => {
    try {
        const response = await Liga.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }

}
export const postLiga = (req, res) => {
    if (req.files === null) return res.status(400).json({ message: "tidak ada file" })
    const name = req.body.title;
    const leagues = req.body.leagues;
    const file = req.files.file;
    const fileSize = file.data.length;
    const extension = path.extname(file.name);
    const filename = file.md5 + extension;
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
    const alloweType = ['.png', '.jpg', '.jpeg'];

    if (!alloweType.includes(extension.toLowerCase())) return res.status(422).json({ meesage: "tipe data image salah" });
    if (fileSize > 5000000) return res.status(422).json({ message: "data image harus lebih kecil dari 5 mb" });

    file.mv(`./public/images/${filename}`, async (err) => {
        if (err) return res.status(500).json({ message: err.message })
        try {
            await Liga.create({ name: name, leagues: leagues, Image: filename, url: url })
            res.status(201).json({ message: "data berhasil" })
        } catch (error) {
            console.log(error.message);

        }
    })
}
export const patchLiga = async (req, res) => {
    const tipeliga = await Liga.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!tipeliga) return res.status(404).json({ message: "tidak ada ada" })
    let filename = "";
    if(req.files === null) {
        filename = Liga.Image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const extension = path.extname(file.name);
        filename = file.md5 + extension;

        const alloweType = ['.png', '.jpg', '.jpeg'];

        if(!alloweType.includes(extension.toLowerCase())) return res.status(422).json({ meesage: "tipe data image salah" });
        if(fileSize > 5000000) return res.status(422).json({ message: "data image harus lebih kecil dari 5 mb" });

        const filepath = `./public/images/${tipeliga.Image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${filename}`, (err) => {
            if(err) return res.status(500).json({ message: err.message })
        });
    }
    const name = req.body.title;
    const leagues = req.body.leagues;
    const url = `${req.protocol}://${req.get("host")}/images/${filename}`;
    try {
        await Liga.update({name: name, leagues: leagues, Image: filename, url: url},{
            where:{
                id:req.params.id
            }
        })
        res.status(200).json({message:"data berhasil di update"});
    } catch (error) {
        console.log(error.meesage);
        
    }
}
export const deleteLiga = async (req, res) => {
    const tipeliga = await Liga.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!tipeliga) return res.status(404).json({ message: "tidak ada ada" })
    try {
        const filepath = `./public/images/${tipeliga.Image}`;
        fs.unlinkSync(filepath);
        await Liga.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: "data berhasil dihapus" })
    } catch (error) {
        console.log(error.message);
    }

}