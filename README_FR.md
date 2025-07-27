# generate-unique-key

Un générateur de clés uniques simple et flexible pour vos projets JavaScript/TypeScript.

### Installation

```bash
npm install @neylorxt/generate-unique-key

# Migration depuis l'ancienne version
npm uninstall @neylorxt/react-api
npm install @neylorxt/react-request@latest


# ou


yarn add @neylorxt/generate-unique-key

# Migration depuis l'ancienne version
yarn remove @neylorxt/react-api
yarn add @neylorxt/react-request@latest
```

### Types de Base

```typescript
type KeyType = 'number' | 'letter' | 'default';

interface GenerateKeyOptions {
    type?: KeyType;        // Type de caractères à utiliser
    length?: number;       // Longueur de la clé
    separator?: string;    // Caractère séparateur
    separatorInterval?: number; // Intervalle entre les séparateurs
}
```

### Guide Détaillé des Paramètres

#### Types de Clés (`type`)
- `'number'` : Utilise uniquement des chiffres (0-9)
- `'letter'` : Utilise uniquement des lettres (a-z, A-Z)
- `'default'` : Utilise des caractères alphanumériques (0-9, a-z, A-Z)

#### Longueur (`length`)
- Valeur par défaut : 8
- Description : Nombre de caractères dans la clé (hors séparateurs)
- Contrainte : Doit être supérieur à 0

#### Séparateur (`separator`)
- Valeur par défaut : '-'
- Description : Caractère utilisé pour séparer les groupes de caractères
- Exemples : '-', '_', '.', ':'

#### Intervalle de Séparation (`separatorInterval`)
- Valeur par défaut : 4
- Description : Nombre de caractères entre chaque séparateur
- Exemple : Avec interval=4, "AAAA-BBBB-CCCC"

### Fonctionnalités Détaillées avec Exemples

#### 1. generateKey - Générateur Principal
```typescript
// Configuration de base
const simpleKey = generateKey();
// => 'Ax7k9Pq2'

// Configuration complète
const customKey = generateKey({
    type: 'default',      // Type de caractères (default/number/letter)
    length: 12,           // Longueur totale
    separator: '-',       // Caractère séparateur
    separatorInterval: 4  // Groupes de 4 caractères
});
// => 'Ax7k-9Pq2-Bn4m'

// Exemple avec différents séparateurs
const keyWithDots = generateKey({
    length: 12,
    separator: '.',
    separatorInterval: 3
});
// => 'Ax7.k9P.q2B.n4m'
```

#### 2. generateNumericKey - Clés Numériques
```typescript
// Paramètres:
// - length: nombre de chiffres (défaut: 8)
// - separator: caractère séparateur (défaut: '-')
// - separatorInterval: taille des groupes (défaut: 4)

// Clé numérique simple
const numKey = generateNumericKey();
// => '12345678'

// Clé numérique formatée
const formattedNumKey = generateNumericKey(10, '-', 5);
// => '12345-67890'

// Clé numérique avec format personnalisé
const customNumKey = generateNumericKey(12, '.', 3);
// => '123.456.789.012'
```

#### 3. generateAlphaKey - Clés Alphabétiques
```typescript
// Paramètres identiques à generateNumericKey
// Utilise uniquement des lettres (a-z, A-Z)

const alphaKey = generateAlphaKey(8, '-', 4);
// => 'AbCd-EfGh'

// Exemple avec format personnalisé
const customAlphaKey = generateAlphaKey(12, '_', 6);
// => 'AbCdEf_GhIjKl'
```

#### 4. generateUUID - Format UUID Simplifié
```typescript
// Paramètre:
// - type: type de caractères à utiliser (défaut: 'default')

const uuid = generateUUID();
// => 'a1B2-c3D4-e5F6-g7H8'

const numericUuid = generateUUID('number');
// => '1234-5678-9012-3456'

const letterUuid = generateUUID('letter');
// => 'abCD-efGH-ijKL-mnOP'
```

#### 5. generateShortKey - Clés Courtes
```typescript
// Paramètre:
// - type: type de caractères (défaut: 'default')
// Génère toujours une clé de 4 caractères

const shortKey = generateShortKey();
// => 'A1b2'

const numericShort = generateShortKey('number');
// => '1234'
```

#### 6. generateCustomKey - Clés avec Préfixe/Suffixe
```typescript
// Paramètres:
// - prefix: texte à ajouter au début
// - suffix: texte à ajouter à la fin
// - options: options de génération standards

// Exemple avec préfixe et suffixe
const userKey = generateCustomKey('USER-', '-2023', {
    type: 'default',
    length: 6
});
// => 'USER-A1b2C3-2023'

// Exemple pour un ID de commande
const orderId = generateCustomKey('ORD-', '', {
    type: 'number',
    length: 8
});
// => 'ORD-12345678'
```

#### 7. validateKey - Validation de Clés
```typescript
// Paramètres:
// - key: la clé à valider
// - type: le type attendu (optionnel)

// Validation simple
validateKey('A1b2-C3d4');  // true
validateKey('ABC-123', 'default');  // true
validateKey('123-456', 'number');   // true
validateKey('AbC-DeF', 'letter');   // true

// Cas invalides
validateKey('ABC-123', 'number');   // false (contient des lettres)
validateKey('123', 'letter');       // false (contient des chiffres)
validateKey('');                    // false (vide)
```

### Gestion des Erreurs

Le package inclut une gestion des erreurs pour les cas suivants :
- Longueur négative ou nulle
- Type de clé invalide
- Paramètres manquants ou incorrects

Exemple de gestion d'erreur :
```typescript
try {
    const key = generateKey({ length: -1 });
} catch (error) {
    console.error(error.message); // "La longueur doit être supérieure à 0"
}
```

### Tableau des Options

| Option            | Type     | Défaut    | Description                                    |
|------------------|----------|-----------|------------------------------------------------|
| type             | string   | 'default' | Type de clé ('number', 'letter', 'default')    |
| length           | number   | 8         | Longueur de la clé                             |
| separator        | string   | '-'       | Caractère séparateur                           |
| separatorInterval| number   | 4         | Intervalle entre les séparateurs               |

## Licence

MIT
