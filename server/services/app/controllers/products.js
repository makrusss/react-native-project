const { Image, Category, Product } = require("../models/index");
const { sequelize } = require("../models/");
class Controller {
  static async ProductsList(req, res, next) {
    try {
      console.log(`masuk fetch all di server app`)
      let data = await Product.findAll({
        order: [["id", "asc"]],
        include: [Category, Image],
      });
      if (!data) {
        throw { name: "DATA_NOT_FOUND", id };
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
  static async createProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let {
        name,
        stock,
        description,
        price,
        mainImg,
        categoryId,
        slug,
        authorMongoId,
        ImageName,
      } = req.body;
      if (!ImageName[0].imgUrl) {
        throw { name: "SequelizeValidationError" };
      }
      let data = await Product.create(
        {
          name,
          stock,
          description,
          price,
          mainImg,
          categoryId,
          slug,
          authorMongoId,
        },
        { transaction: t }
      );
      if (!data) {
        throw { name: "SequelizeValidationError" };
      }
      let Images = ImageName.map((el) => {
        el.productId = data.id;
        return el;
      });
      await Image.bulkCreate(Images, { transaction: t });
      await t.commit();
      res.status(201).json(data);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async ProductById(req, res, next) {
    try {
      let id = req.params.id;
      let data = await Product.findByPk(id, {
        include: [Category, Image],
      });
      if (!data) {
        throw { name: "DATA_NOT_FOUND", id };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      let id = req.params.id;
      let deleted = await Product.findByPk(id);
      if (!deleted) {
        throw { name: "DATA_NOT_FOUND", id };
      }
      await Product.destroy({ where: { id } });
      res
        .status(200)
        .json({ msg: `${deleted.name} has been successfully removed` });
    } catch (error) {
      next(error);
    }
  }
  static async editProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let id = req.params.id;
      let { name, description, price, imgUrl, categoryId, ImageName } =
        req.body;
      let updated = await Product.findByPk(id);
      if (!updated) {
        throw { name: "DATA_NOT_FOUND" };
      }
      let data = await Product.update(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId,
        },
        { where: { id }, transaction: t }
      );
      if (data[0] == 0) {
        throw { name: "DATA_NOT_FOUND" };
      }
      let Images = ImageName.map((el) => {
        el.productId = updated.id;
        return el;
      });
      await Image.destroy({
        where: { ProductId: updated.id },
        transaction: t,
      });
      await Image.bulkCreate(Images, { transaction: t });
      await t.commit();
      res.status(201).json(data);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = Controller;
