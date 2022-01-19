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
  contact_num  VARCHAR(15),
  name VARCHAR(255),
  email VARCHAR(255),
  address VARCHAR(255),
  -- birthday DATE,
  score INT DEFAULT 1000000,
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
