-- Return all users data
SELECT 
  users.name AS username, 
  roles.name AS role, 
  users.banned, 
  users.chat
FROM users
  JOIN roles ON users.role_id = roles.id;


-- Select all projects
SELECT 
  projects.title AS text, 
  projects.id AS value 
FROM projects;

