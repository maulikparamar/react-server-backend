const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { insert, view, update, deleteData } = require("../database/query");
const { schemaLogin, schemaUser_info } = require("../joi_schema/all_schema");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
// get method

router.get("/login", async (req, res) => {
  const data = await view("login", "id,username");
  res.send(data);
});
router.get("/category_table", async (req, res) => {
  const data = await view("category_table", "id,category");
  res.send(data);
});

// delete method

router.post("/dcategory_table", async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const data = await deleteData("category_table", `id =${id}`);
  res.send(data.rowsAffected);
});

// put method
router.put("/login", async (req, res) => {
  const { username, id } = req.body;
  const data = await update(
    "category_table",
    { username: username },
    `id=${id}`
  );
  res.send(data.rowsAffected);
});
router.put("/category_table", async (req, res) => {
  const { category, id } = req.body;
  const data = await update(
    "category_table",
    { category: category },
    `id=${id}`
  );
  res.send(data.rowsAffected);
});

// post method
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const resulit = schemaLogin.validate({ username, password });
  if (resulit.error == undefined) {
    var id = await view("login", "id", `username='${username}'`);
    if (id.recordset[0] != null) {
      var pass = await view("login", "password", `username='${username}'`);
      var check = await bcrypt.compare(password, pass.recordset[0].password);
      if (check === true) {
        const sinf = { id: id.recordset[0].id, username: username };
        const token = jwt.sign(sinf, process.env.KEY);
        res.status(200).send({ status: "pass", token: token });
        return;
      } else {
        res.status(200).send("Enter Valid Password");
        return;
      }
    } else {
      res.status(200).send("Enter valid username");
      return;
    }
  } else {
    res.status(200).send(resulit.error.details[0].message);
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const resulit = schemaLogin.validate({ username, password });
  var t = await view("login", "id", `username='${username}'`);
  if (t.rowsAffected[0] == 1) {
    res.status(200).send("All Ready Add");
    return;
  }
  if (resulit.error == undefined) {
    var newpassword = await bcrypt.hash(resulit.value.password, saltRounds);
    res.status(200).send("0");
  } else {
    res.status(200).send(resulit.error.details[0].message);
    return;
  }
  const data = await insert("login", {
    username: username,
    password: newpassword,
    status_log: "0",
  });
  res.end();
});

router.post("/user_info", (req, res) => {
  const { gender, phonenumber, address, dob } = req.body;
  // const id = localStorage.getItem("json-t");
  // const json = jwt.sign({ id: "1", username: "maulik" }, "maaaa", {
  //   expiresIn: 60 * 60,
  // });
  // console.log(json);
  // const y = jwt.verify(token, "maaaa");
  // console.log(y);
  // res.end();
  schemaUser_info.validate({ phonenumber, address, dob });
  if (resulit.error == undefined) {
    const data = insert("user_info", {
      login_id: id,
      gender: gender,
      phone_number: phonenumber,
      address: address,
      dob: dob,
    });
  } else {
    res.status(400).send(resulit.error.details[0].message);
    return;
  }
});

router.post("/category", async (req, res) => {
  const { category } = req.body;
  if (category == "") return res.status(200).send("1");
  const data = await insert("category_table", { category });
  data.message ? res.status(200).send("1") : res.status(200).send("0");
});

router.post("/product_brand", async (req, res) => {
  const { category_id, brand } = req.body;
  if (category_id == "" || brand == "") return res.status(200).send("1");
  const data = await insert("product_brand", { category_id, brand });
  data.message ? res.status(200).send("1") : res.status(200).send("0");
});

router.post("/product_image", async (req, res) => {
  const { product_table_id, image } = req.body;
  if (product_table_id == "" || image == "") return res.status(200).send("1");
  const data = await insert("product_image", { product_table_id, image });
  data.message ? res.status(200).send("1") : res.status(200).send("0");
});

router.post("/product_image_spacification", async (req, res) => {
  const { product_table_id, image, comment } = req.body;
  if (product_table_id == "" || image == "" || comment == "")
    return res.status(200).send("1");
  const data = await insert("product_image_spacification", {
    product_table_id,
    image,
    comment,
  });
  data.message ? res.status(200).send("1") : res.status(200).send("0");
});

router.post("/product_quntity", async (req, res) => {
  const { product_table_id, quntity } = req.body;
  if (product_table_id == "" || quntity == "") return res.status(200).send("1");
  const data = await insert("product_quntity", {
    product_table_id,
    quntity,
  });
  data.message ? res.status(200).send("1") : res.status(200).send("0");
});

router.post("/product_spacification", async (req, res) => {
  const { product_table_id, spacification } = req.body;
  if (product_table_id == "" || spacification == "")
    return res.status(200).send("1");
  const data = await insert("product_spacification", {
    product_table_id,
    spacification,
  });
  data.message ? res.status(200).send("1") : res.status(200).send("0");
});

router.post("/product_table", async (req, res) => {
  const { category_id, product_name, product_brand_id, price } = req.body;
  if (
    category_id == "" ||
    product_name == "" ||
    product_brand_id == "" ||
    price == ""
  )
    return res.status(200).send("1");
  const data = await insert("product_table", {
    category_id,
    product_name,
    product_brand_id,
    price,
  });
  data.message ? res.status(200).send("1") : res.status(200).send("0");
});

module.exports = router;