# Demo project using nest and Dapr - Publisher proyect

## Para inicializar el proyecto se debe ejecutar inicialmente 

dapr init

Al ejecutar este comando dapr cli se encargara de levantar todos los contenedores necesarios para su funcionamiento. Para comprobarlo en la terminal ponemos 

docker ps

Y su output debe ser algo como:

84b1923a56f3   daprio/dapr:1.10.4   "./placement"            11 hours ago   Up 11 hours             0.0.0.0:50005->50005/tcp           dapr_placement
a176a140c93a   openzipkin/zipkin    "start-zipkin"           11 hours ago   Up 11 hours (healthy)   9410/tcp, 0.0.0.0:9411->9411/tcp   dapr_zipkin
33a14bc7242d   redis:6              "docker-entrypoint.s…"   11 hours ago   Up 11 hours             0.0.0.0:6379->6379/tcp             dapr_redis

Una vez confirmado que dapr este configurado exitosamente solo ejecutamos el comando:

npm run dapr:dev