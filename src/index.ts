// src/index.ts

export type KeyType = 'number' | 'letter' | 'default';

export interface GenerateKeyOptions {
    type?: KeyType;
    length?: number;
    separator?: string;
    separatorInterval?: number;
}

/**
 * Generates a unique identifier based on the provided parameters
 * / Génère un identifiant unique basé sur les paramètres fournis
 * @param options - Configuration options for key generation / Options de configuration pour la génération de clé
 * @returns A unique identifier as a string / Un identifiant unique sous forme de chaîne
 */
export function generateKey(options: GenerateKeyOptions = {}): string {
    const {
        type = 'default',
        length = 8,
        separator = '-',
        separatorInterval = 4
    } = options;

    if (length <= 0) {
        throw new Error('Length must be greater than 0 / La longueur doit être supérieure à 0');
    }

    const numbers = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const mixed = numbers + letters;

    let charset: string;
    switch (type) {
        case 'number':
            charset = numbers;
            break;
        case 'letter':
            charset = letters;
            break;
        case 'default':
        default:
            charset = mixed;
            break;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }

    // Add separators if necessary / Ajouter des séparateurs si nécessaire
    if (separatorInterval > 0 && separatorInterval < length) {
        const segments: string[] = [];
        for (let i = 0; i < result.length; i += separatorInterval) {
            segments.push(result.slice(i, i + separatorInterval));
        }
        result = segments.join(separator);
    }

    return result;
}

/**
 * Generates a numeric-only identifier
 * / Génère un identifiant numérique uniquement
 * @param length - Key length (default: 8) / Longueur de la clé (défaut: 8)
 * @param separator - Separator character (default: '-') / Caractère de séparation (défaut: '-')
 * @param separatorInterval - Separator interval (default: 4) / Intervalle de séparation (défaut: 4)
 * @returns A unique numeric identifier / Un identifiant numérique unique
 */
export function generateNumericKey(
    length: number = 8,
    separator: string = '-',
    separatorInterval: number = 4
): string {
    return generateKey({
        type: 'number',
        length,
        separator,
        separatorInterval
    });
}

/**
 * Generates an alphabetic-only identifier
 * / Génère un identifiant alphabétique uniquement
 * @param length - Key length (default: 8) / Longueur de la clé (défaut: 8)
 * @param separator - Separator character (default: '-') / Caractère de séparation (défaut: '-')
 * @param separatorInterval - Separator interval (default: 4) / Intervalle de séparation (défaut: 4)
 * @returns A unique alphabetic identifier / Un identifiant alphabétique unique
 */
export function generateAlphaKey(
    length: number = 8,
    separator: string = '-',
    separatorInterval: number = 4
): string {
    return generateKey({
        type: 'letter',
        length,
        separator,
        separatorInterval
    });
}

/**
 * Generates an alphanumeric identifier (default)
 * / Génère un identifiant alphanumérique (par défaut)
 * @param length - Key length (default: 8) / Longueur de la clé (défaut: 8)
 * @param separator - Separator character (default: '-') / Caractère de séparation (défaut: '-')
 * @param separatorInterval - Separator interval (default: 4) / Intervalle de séparation (défaut: 4)
 * @returns A unique alphanumeric identifier / Un identifiant alphanumérique unique
 */
export function generateAlphaNumericKey(
    length: number = 8,
    separator: string = '-',
    separatorInterval: number = 4
): string {
    return generateKey({
        type: 'default',
        length,
        separator,
        separatorInterval
    });
}

/**
 * Generates a simplified UUID in XXXX-XXXX-XXXX-XXXX format
 * / Génère un UUID simplifié au format XXXX-XXXX-XXXX-XXXX
 * @param type - Type of characters to use / Type de caractères à utiliser
 * @returns A simplified UUID / Un UUID simplifié
 */
export function generateUUID(type: KeyType = 'default'): string {
    return generateKey({
        type,
        length: 16,
        separator: '-',
        separatorInterval: 4
    });
}

/**
 * Generates a short identifier (4 characters)
 * Génère un identifiant court (4 caractères)
 * @param type - Type of characters to use / Type de caractères à utiliser
 * @returns A short identifier / Un identifiant court
 */
export function generateShortKey(type: KeyType = 'default'): string {
    return generateKey({
        type,
        length: 4,
        separator: '',
        separatorInterval: 0
    });
}

/**
 * Generates a custom identifier with prefix and suffix
 * Génère un identifiant personnalisé avec préfixe et suffixe
 * @param prefix - Prefix to add / Préfixe à ajouter
 * @param suffix - Suffix to add / Suffixe à ajouter
 * @param options - Generation options / Options de génération
 * @returns An identifier with prefix and suffix / Un identifiant avec préfixe et suffixe
 */
export function generateCustomKey(
    prefix: string = '',
    suffix: string = '',
    options: GenerateKeyOptions = {}
): string {
    const key = generateKey(options);
    return `${prefix}${key}${suffix}`;
}

/**
 * Validates if a string looks like an identifier generated by this package
 * Valide si une chaîne ressemble à un identifiant généré par ce package
 * @param key - The identifier to validate / L'identifiant à valider
 * @param type - The expected type (optional) / Le type attendu (optionnel)
 * @returns true if the identifier seems valid / true si l'identifiant semble valide
 */
export function validateKey(key: string, type?: KeyType): boolean {
    if (!key || typeof key !== 'string') {
        return false;
    }

    // Remove separators for validation / Supprimer les séparateurs pour la validation
    const cleanKey = key.replace(/[-_\s]/g, '');

    if (cleanKey.length === 0) {
        return false;
    }

    const numberRegex = /^[0-9]+$/;
    const letterRegex = /^[a-zA-Z]+$/;
    const mixedRegex = /^[a-zA-Z0-9]+$/;

    switch (type) {
        case 'number':
            return numberRegex.test(cleanKey);
        case 'letter':
            return letterRegex.test(cleanKey);
        case 'default':
        default:
            return mixedRegex.test(cleanKey);
    }
}

// Export by default / Export par défaut
export default {
    generateKey,
    generateNumericKey,
    generateAlphaKey,
    generateAlphaNumericKey,
    generateUUID,
    generateShortKey,
    generateCustomKey,
    validateKey
};