const { view } = require("./query");

(async function () {
  const d = await view("user_info");
  console.log(d);
})();
