const mysql = require('mysql')
const config = require('../config')

const pool = mysql.createPool(config.mysql);

module.exports = function(sql, option, callback) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if(err) throw err;
            
            console.log('mysql数据库连接成功');
            connection.query(sql, option, function(err, res, fields) {
                connection.release();

                if(err) {
                    return reject(err);
                }

                return resolve(res);
            })
        })
    });
}
