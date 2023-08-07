const express = require("express");

const router = express.Router();
const Gallery = require("../models/Gallery");

//GET

router.get("/", async (req, res) => {
  const qsearch = req.query.search;

  try {
    let galleries;

    if (qsearch) {
      galleries = await (
        await Gallery.find({
          $text: {
            $search: qsearch,
            $caseSensitive: false,
            $diacriticSensitive: false,
          },
        })
      ).reverse();
    } else {
      galleries = await (await Gallery.find()).reverse();
    }

    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST

router.post("/", async (req, res) => {
  const gallery = Gallery(req.body);

  try {
    const savedGallery = await gallery.save();

    res.status(201).json(savedGallery);
  } catch (error) {
    res.status(500).json("something went wrong");
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json("gallery was deleted");
  } catch (error) {
    res.status(500).json("something went wrong");
  }
});

module.exports = router;
