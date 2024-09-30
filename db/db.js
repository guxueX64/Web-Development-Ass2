const mysql = require('mysql2');
const pool = mysql.createPool({   //DB Connection Pool
 host: 'localhost',
 port: '3306',
 user: 'root',
 password: '123456',
 database: 'crowdfunding_db',
});


if (pool) {
 console.log('MySQL server started and connected successfully  ...');
}

//Link Database
function query(sql, callback) {
  console.log('   ');
  console.info('==========', '[  ', sql, '  ]');
  console.log('   ');
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      if(err){
        console.log(err);
      }
      callback(err, rows);
      connection.release();
    });
  });
}

module.exports = {
  query
};



