var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host     : process.env.dojo_mysql_host,
    user     : process.env.dojo_mysql_username,
    password : process.env.dojo_mysql_password,
    database : process.env.dojo_mysql_database,
    debug    : false
});

exports.getUsernames = function () {
    return new Promise(function(resolve, reject) {
        const queryString = 'SELECT `NickName` from `User`;';
        executeQuery(queryString).then(function (data) {
            var user_names = [];
            data.forEach(function (row) {
                user_names.push(row.NickName);
            });
            resolve(user_names);
        }).catch(function (err) {
            console.error('Failed to get user names.');
            reject(err);
        });
    });
};

exports.getUsers = function () {
    return new Promise(function(resolve, reject) {
        const queryString = 'SELECT `NickName`, `UserType`, `CreatedDate`, `DOB` FROM `User` ORDER BY UserType Asc, CreatedDate Asc;';
        executeQuery(queryString).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            console.error('Failed to get users.' + err);
            reject(err);
        });
    });
};

function executeQuery(queryString) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err,connection){
            if (err) {
                console.error('Error in connection database');
                reject(err);
            }

            connection.on('error', function (err) {
                console.error('Error in connection database');
                reject(err);
            });

            connection.query(queryString, function (err, rows, fields) {
                if (!err) {
                    resolve(rows);
                    connection.release();
                } else {
                    console.error('Error while performing Query.');
                    connection.release();
                    reject(err);
                }
            });
        })
    });
}
