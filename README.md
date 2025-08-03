Assaf Sardi - backend: Node.js + express, frontend: Vite + React, DB: MySQL

# DB
```shell
  mysql.server start
```

```shell
  mysql -u root -p
```

```shell
  CREATE DATABASE node_db;

  USE node_db;

  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
  );
```

```shell
  INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com'), ('Bob', 'bob@example.com');
```

```shell
  mysql.server stop
```

# RUN
Start server
```node server/app.js```

Start client
```shell
  cd client
  npm run dev
```

Access frontend [here](http://localhost:5173)
