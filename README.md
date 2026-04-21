# Chatbot Intelligent STEG

Chatbot intelligent pour la Societe Tunisienne de l'Electricite et du Gaz (STEG).

## Stack Technologique

- **Interface Web**: React + TypeScript + Tailwind CSS
- **Backend Logic**: API Routes / Services TypeScript
- **Base de Donnees**: Compatible SQL Server (via API)
- **Moteur IA**: Labess-7B-Chat (Dialecte Tunisien) via Hugging Face / Ollama

## Fonctionnalites

- Chat en dialecte tunisien (Derja)
- Consultation des factures
- Signalement de pannes (electricite/gaz)
- Historique des reclamations
- Interface d'administration complete
- Tableau de bord analytique

## Installation

```bash
pnpm install
pnpm run dev
```

## Configuration IA (Optionnel - pour Ollama local)

```bash
# Installer Ollama
# https://ollama.com/download

# Telecharger le modele Labess
ollama pull wghezaiel/labess-7b-chat

# Lancer le serveur
ollama serve
```

## Projet de Fin d'Etudes
