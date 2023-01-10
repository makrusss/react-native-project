const { Category } = require("../models/index");

class Controller {
  static async categoryList(req, res, next) {
    try {
      let data = await Category.findAll({ order: [["id", "asc"]] });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async categoryById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Category.findByPk(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      let { name } = req.body;
      let data = await Category.create({
        name,
      });
      if (!data) {
        throw { name: "SequelizeValidationError" };
      }
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async editCategory(req, res, next) {
    try {
      let id = req.params.id;
      let updated = await Category.findByPk(id);
      if (!updated) {
        throw { name: "DATA_NOT_FOUND" };
      }
      let { name } = req.body;
      let data = await Category.update(
        {
          name,
        },
        { where: { id } }
      );
      if (data[0] == 0) {
        throw { name: "DATA_NOT_FOUND" };
      }
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      let id = req.params.id;
      let deleted = await Category.findByPk(id);
      if (!deleted) {
        throw { name: "DATA_NOT_FOUND", id };
      }
      await Category.destroy({ where: { id } });
      res
        .status(200)
        .json({ msg: `${deleted.name} has been successfully removed` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
