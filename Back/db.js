const mysql = require("mysql");

const pool = mysql.createPool({
  host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
  user: "bsale_test",
  password: "bsale_test",
  database: "bsale_test",
});

function keepAlive() {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error("mysql keepAlive err", err);
      return;
    }
    console.log("Base de datos en stand by");
    connection.ping();
    connection.release();
  });
}
setInterval(keepAlive, 60000);

module.exports = pool;
