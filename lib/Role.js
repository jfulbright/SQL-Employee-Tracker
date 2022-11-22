const db = require('../db/connection.js');

const roleSelect = `SELECT role.id, role.title, role.salary, department.name
AS department
FROM role
LEFT JOIN department
ON role.department_id = department.id`;

// const arrayizeDept = () => {
//     let dept = [];
//     db.query(`SELECT name FROM department`, (req, res) => {
//         dept.push(res)
//     })
//     return dept;
// };


// db.query("SELECT * FROM department", function (err, result, fields) {
//     Object.keys(result).forEach(function(key) {
//         var row = result[key];
//         return(JSON.stringify(row.name))
//     });
// });

// var departmentData = [
//     {
//         name: db.query("SELECT name FROM department", (req, res) => {return res}),
//         value: db.query(`SELECT id FROM department`, (req, res) => {return res})
//     }
// ]

// const deptArray = () => {
//     db.query(`SELECT id AS value, name FROM department`, (req, res) => {
//         Object.values(JSON.parse(JSON.stringify(res)))
//     })
// }


const rolePrompt = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the role name?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary? (Enter a NUMBER)'
    },
    {
        type: 'list',
        name: 'department',
        message: 'In which department is this role?',
        choices: ['Sales', 'Engineering', 'Finance', 'Legal', 'Human Resources']
    }
];

const roleInsert = (({ roleName, salary, department }) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE name = ?))`;
    const params = [roleName, salary, department];
    db.query(sql, params);
});

roleDestroyPrompt = [
    {
        type: 'list',
        name: 'destroyRole',
        message: 'Which role would you like to remove?',
        choices: ['Salesperson', 'Sales Lead', 'Engineer', 'Lead Engineer', 'Accountant', 'Chief Financial Officer', 'Lawyer', 'Legal Team Lead', 'Human Resources Employee', 'Human Resources Director']
    }
];

roleDestroyInsert = (({ destroyRole }) => {
    const sql = `DELETE FROM role WHERE title = ?`;
    const params = [destroyRole];
    db.query(sql, params, (err, res) => {});
});

module.exports = {
    roleSelect,
    rolePrompt,
    roleInsert,
    roleDestroyPrompt,
    roleDestroyInsert
};