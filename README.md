# Installation

Créer le network avec docker suivant :
````bash
docker network create payless-network
````

## front

copier le .env.example en .env

## back

copier le .env.example en .env

La variable `PAYLESS_PUBLIC_KEY` correspond à la clé public du marchant sur le backoffice, ou une clé générée
La variable `PAYLESS_PUBLIC_KEY` correspond à la clé secrete du marchant sur le backoffice

La variable `PAYLESS_MERCHANT_ID` correspond à l'id du marchant disponible sur le backoffice
# Lancer le projet

A la racine du projet lancer la commande suivante :
```bash
docker-compose up -d
```

# Migration (Obligatoire)

Il suffit de lancer la commande suivant pour lancer les migrations :
````bash
docker exec payless-api-1 node migrate.js
````

vous pouvez aussi lancer un seed pour avoir quelques données :
````bash
docker exec mercant-site-server-1 node seed.js
````