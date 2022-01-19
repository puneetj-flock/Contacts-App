CREATE TABLE Contacts (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  address varchar(255),
  birthday date,
  score int DEFAULT 1000000,
  PRIMARY KEY (id)
);
CREATE TABLE Users (
 id int NOT NULL AUTO_INCREMENT,
 name varchar(255) NOT NULL,
 email varchar(255) NOT NULL UNIQUE,
 password varchar(255),
 PRIMARY KEY (id)
);

CREATE TABLE Sessions (
 id int NOT NULL AUTO_INCREMENT,
 user_id varchar(255) NOT NULL,
 token varchar(255) NOT NULL UNIQUE,
 expire TIMESTAMP,
 PRIMARY KEY (id) );
