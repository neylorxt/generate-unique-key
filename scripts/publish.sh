#!/bin/bash

# Script de publication du package unique-id-gen

set -e

echo "🚀 Début de la publication du package unique-id-gen"

# Vérifier que nous sommes sur la branche main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "dev" ] && [ "$CURRENT_BRANCH" != "dev" ]; then
    echo "❌ Erreur: Vous devez être sur la branche main/master pour publier"
    exit 1
fi

# Vérifier qu'il n'y a pas de changements non commitės
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erreur: Il y a des changements non commitės"
    echo "Veuillez committer ou stasher vos changements avant de publier"
    exit 1
fi

# Nettoyer les anciens builds
echo "🧹 Nettoyage des anciens builds..."
npm run clean

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci

# Lancer les tests
echo "🧪 Lancement des tests..."
npm test

# Linter le code
echo "🔍 Vérification du code avec ESLint..."
npm run lint

# Build du package
echo "🔨 Build du package..."
npm run build

# Vérifier que les fichiers de build existent
if [ ! -f "dist/index.js" ] || [ ! -f "dist/index.d.ts" ]; then
    echo "❌ Erreur: Les fichiers de build sont manquants"
    exit 1
fi

# Vérifier la version dans package.json
PACKAGE_VERSION=$(node -p "require('./package.json').version")
echo "📋 Version actuelle: $PACKAGE_VERSION"

# Demander confirmation
read -p "🤔 Voulez-vous publier la version $PACKAGE_VERSION ? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Publication annulée"
    exit 1
fi

# Créer un tag git
echo "🏷️  Création du tag git v$PACKAGE_VERSION..."
git tag "v$PACKAGE_VERSION"

# Publier sur npm
echo "🚀 Publication sur npm..."
npm publish

# Pousser le tag sur le repository
echo "📤 Push du tag sur le repository..."
git push origin "v$PACKAGE_VERSION"

echo "✅ Publication réussie !"
echo "📦 Package unique-id-gen v$PACKAGE_VERSION publié avec succès"
echo "🔗 Vous pouvez maintenant l'installer avec: npm install unique-id-gen@$PACKAGE_VERSION"