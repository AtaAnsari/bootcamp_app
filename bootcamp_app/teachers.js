const { Pool } = require('pg');

var myArgs = process.argv.slice(2);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT teachers.name AS teacher, cohorts.name AS cohorts
FROM cohorts 
JOIN students ON cohorts.id = cohort_id
JOIN assistance_requests ON students.id = student_id
JOIN teachers ON teacherS.id = teacher_id 
WHERE cohorts.name = '${myArgs[0]}'
GROUP BY teacher, cohorts
ORDER BY cohorts

`)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohorts}: ${teacher.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));

