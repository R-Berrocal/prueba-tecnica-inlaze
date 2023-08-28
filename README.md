<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Prueba Tecnica Inlaze

1. Clonar proyecto
2. ```yarn install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```

6. Ejecute los scripts Sql dentro del gestor de base de datos
```
1. Ejecute el archivo role.sql
2. Ejecute el archivo users.sql
 ```


7. Levantar: ```yarn start:dev```

8. Usuarios
```
ADMIN: {
  "email": "jose23@gmail.com",
  "password": "Juan123"
}

USER: {
  "email":"robertoberro20@gmail.com",
  "password":"Roberto123"
}
```
