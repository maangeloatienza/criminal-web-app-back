DEVELOPMENT = true;

PORT = 8084,

MYSQL_HOST = DEVELOPMENT ?process.env.MYSQL_HOST : '85.10.205.173';
MYSQL_USER = DEVELOPMENT ?process.env.MYSQL_USER : 'criminal_web';
MYSQL_PASSWORD = DEVELOPMENT ?process.env.MYSQL_PASSWORD : 'secret_password123';
MYSQL_DATABASE = DEVELOPMENT ?process.env.MYSQL_DATABASE : 'criminal_db';

JWT_TOKEN      = 'secret_key';
SECRET_KEY     = 'secret';



