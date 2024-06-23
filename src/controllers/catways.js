const Catway = require("../models/catway");

exports.getCatways = async (req, res, next) => {
  try {
    const catways = await Catway.find();
    res.status(200).send(catways);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getCatwayById = async (req, res, next) => {
  const id = req.params.id;

  try {
    let catway = await Catway.findById(id);

    if (catway) {
      return res.status(200).json(catway);
    }

    return res.status(404).json("catway_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.addCatway = async (req, res, next) => {
  const temp = {
    catwayNumber: req.body.catwayNumber,
    type: req.body.type,
    catwayState: req.body.catwayState,
  };

  try {
    let catway = await Catway.create(temp);

    return res.status(201).json(catway);
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.updateCatway = async (req, res, next) => {
  const id = req.params.id;
  const temp = {
    catwayNumber: req.body.catwayNumber,
    type: req.body.type,
    catwayState: req.body.catwayState,
  };

  try {
    let catway = await Catway.findById({ _id: id });

    if (catway) {
      Object.keys(temp).forEach((key) => {
        if (!!temp[key]) {
          catway[key] = temp[key];
        }
      });

      await catway.save();
      return res.status(201).json(catway);
    }

    return res.status(404).json("catway_not_found");
  } catch (error) {
    return res.status(501).json(error);
  }
};

exports.deleteCatway = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Catway.deleteOne({ _id: id });

    return res.status(204).json("delete_ok");
  } catch (error) {
    return res.status(501).json(error);
  }
};