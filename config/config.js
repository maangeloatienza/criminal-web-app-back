DEVELOPMENT = false;

PORT = 8084,

MYSQL_HOST = DEVELOPMENT ?process.env.MYSQL_HOST : /*'85.10.205.173'*/ 'localhost';
MYSQL_USER = DEVELOPMENT ?process.env.MYSQL_USER : /*'criminal_web'*/ 'root';
MYSQL_PASSWORD = DEVELOPMENT ?process.env.MYSQL_PASSWORD : /*'secret_password123'*/ '12345';
MYSQL_DATABASE = DEVELOPMENT ?process.env.MYSQL_DATABASE : /*'criminal_db'*/ 'criminal_watch_db';

JWT_TOKEN      = 'secret_key';
SECRET_KEY     = 'secret';



