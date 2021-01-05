const config = require("./config");
const mssql = require("mssql");

async function view(table, data = "*", where = "", other = "") {
  try {
    if (where) {
      where = `where ${where}`;
    }
    const mssqlconncet = await mssql.connect(config);
    const result = await mssqlconncet
      .request()
      .query(`select ${data} from ${table} ${where} ${other}`);
    return result;
  } catch (error) {
    return error;
  }
}
async function insert(table, values) {
  try {
    var ff = "";
    var vv = "";
    var t = 1;
    for (let [key, value] of Object.entries(values)) {
      if (t == 1) {
        ff = key;
        vv = "'" + value + "'";
      } else {
        ff = ff + "," + key;
        vv = vv + "," + "'" + value + "'";
      }
      t++;
    }
    const mssqlconncet = await mssql.connect(config);
    const result = await mssqlconncet
      .request()
      .query(
        `insert into ${table}(${ff}) OUTPUT inserted.id as id values (${vv})`
      );

    return result;
  } catch (error) {
    return error;
  }
}

async function update(table, values, where = "") {
  try {
    var ff = "";
    var t = 1;

    for (let [key, value] of Object.entries(values)) {
      if (t == 1) {
        ff = key + "=" + "'" + value + "'";
      } else {
        ff = ff + "," + key + "=" + "'" + value + "'";
      }
      t++;
    }

    const mssqlconncet = await mssql.connect(config);
    const result = await mssqlconncet
      .request()
      .query(`update ${table} set ${ff} where ${where}`);
    return result;
  } catch (error) {
    return error;
  }
}

async function deleteData(table, where) {
  try {
    const mssqlconncet = await mssql.connect(config);
    const result = await mssqlconncet
      .request()
      .query(`delete from ${table} where ${where}`);
    return result;
  } catch (error) {
    return error;
  }
}
module.exports = { view, insert, update, deleteData };
