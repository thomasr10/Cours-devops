# projet-docker

API REST de gestion de tâches (Node.js + Express + MongoDB), containerisée avec Docker.

## Prérequis

- [Docker](https://www.docker.com/) & Docker Compose
- [Node.js 18+](https://nodejs.org/) (uniquement pour le développement local)

## Variables d'environnement

Copie le fichier `.env.example` et renseigne les valeurs :

```bash
cp .env.example .env
```

| Variable  | Description              | Exemple                              |
|-----------|--------------------------|--------------------------------------|
| `PORT`    | Port d'écoute du serveur | `5000`                               |
| `DB_URL`  | URL de connexion MongoDB | `mongodb://mongo:27017/ToDoDocker`        |

## Lancer l'application

### Avec Docker (recommandé)

```bash
# Créer le volume externe (une seule fois)
docker volume create todo-logs

# Build et démarrage
docker compose up --build
```

L'API est accessible sur : `http://localhost:5000`

### En local (sans Docker)

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

> Une instance MongoDB doit tourner localement et `DB_URL` doit pointer dessus.

## Routes disponibles

| Méthode | Route         | Description              |
|---------|---------------|--------------------------|
| GET     | `/health`     | Vérifier l'état de l'API |
| GET     | `/api/tasks`  | Lister toutes les tâches |
| POST    | `/api/tasks`  | Créer une tâche          |

### Exemple POST `/api/tasks`

```json
{
  "title": "Ma tâche",
  "description": "Une description"
}
```

## Tests

```bash
# Installer les dépendances de dev
npm install

# Lancer les tests
npm test
```

Les tests sont organisés en deux dossiers :
- `tests/unit/` — validation du modèle Mongoose
- `tests/integration/` — tests des routes HTTP avec une BDD en mémoire

## Structure du projet

```
├── src/
│   ├── index.js              # Point d'entrée
│   ├── models/
│   │   └── task.js           # Modèle Mongoose
│   ├── routes/
│   │   └── tasks.js          # Routes /api/tasks
│   └── middlewares/
│       └── errorHandler.js   # Gestion des erreurs
├── tests/
│   ├── integration/
│   │   └── api.test.js
│   └── unit/
│       └── task.test.js
├── Dockerfile
├── docker-compose.yml
└── .env.example
```