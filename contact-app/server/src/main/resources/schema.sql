CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE Contacts (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  contact VARCHAR(15) DEFAULT "",
  name VARCHAR(255) DEFAULT "",
  email VARCHAR(255) DEFAULT "",
  address VARCHAR(255) DEFAULT "",
  score INT DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Sessions (
  session_token VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  expiry_time TIMESTAMP NOT NULL,
  PRIMARY KEY(session_token),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE INDEX Contacts_User_id_Name ON Contacts(user_id ASC, name ASC);

CREATE INDEX Sessions_User_id ON Sessions(user_id ASC);
