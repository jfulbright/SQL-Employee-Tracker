const db = require('../db/connection.js');

const departmentSelect = `SELECT * FROM department`;

const departmentPrompt = [
    {
        type: 'input',
        name: 'deptName',
        message: 'What is the department name?'
    }
];

const departmentInsert = (({ deptName }) => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = deptName;
    db.query(sql, params, (err, res) => {});
});

const getDepartmentCost = `
SELECT department.name AS department, SUM(role.salary) AS cost 
FROM employee
LEFT JOIN role ON role_id = role.id
LEFT JOIN department ON role.department_id = department.id 
GROUP BY department`;

departmentDestroyPrompt = [
    {
        type: 'list',
        name: 'destroyDepartment',
        message: 'Which department would you like to remove?',
        choices: ['Sales', 'Engineering', 'Finance', 'Legal', 'Human Resources']
    }
];

departmentDestroyInsert = (({ destroyDepartment }) => {
    const sql = `DELETE FROM department WHERE name = ?`;
    const params = [destroyDepartment];
    db.query(sql, params, (err, res) => {});
});

module.exports = {
    departmentSelect,
    departmentPrompt,
    departmentInsert,
    getDepartmentCost,
    departmentDestroyPrompt,
    departmentDestroyInsert
};