# 🍱 My Bento Budget

Application web de suivi de dépenses personnelles.

## Stack

- **Frontend** : React + TypeScript (Vite)
- **Backend** : Node.js + Express + TypeScript
- **Base de données** : PostgreSQL
- **Containerisation** : Docker

## Prérequis

- Node.js v22+
- Yarn v1.22+
- Docker Desktop

## Installation

### 1. Cloner le repo

git clone git@github.com:[TON_USERNAME]/my-bento-budget.git
cd my-bento-budget

### 2. Configurer les variables d'environnement

cp .env.example .env

Editer `.env` avec tes valeurs.

### 3. Lancer en développement

Backend :
cd backend && yarn dev

Frontend :
cd frontend && yarn dev

## Structure du projet

my-bento-budget/
├── backend/ # API Express + TypeScript
├── frontend/ # React + TypeScript (Vite)
├── docker-compose.yml
├── .env.example
└── README.md
