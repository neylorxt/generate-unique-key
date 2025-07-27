// tests/index.test.ts

import {
    generateKey,
    generateNumericKey,
    generateAlphaKey,
    generateAlphaNumericKey,
    generateUUID,
    generateShortKey,
    generateCustomKey,
    validateKey
} from '../src/index';

describe('Générateur d\'identifiants uniques', () => {

    describe('generateId', () => {
        test('generates an ID with the default settings', () => {
            const id = generateKey();
            expect(id).toMatch(/^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/);
            expect(id.length).toBe(9); // 8 caractères + 1 séparateur
        });

        test('generates a numeric ID', () => {
            const id = generateKey({ type: 'number', length: 6 });
            expect(id).toMatch(/^[0-9]{4}-[0-9]{2}$/);
        });

        test('generates an alphabetic ID', () => {
            const id = generateKey({ type: 'letter', length: 6 });
            expect(id).toMatch(/^[a-zA-Z]{4}-[a-zA-Z]{2}$/);
        });

        test('generates an ID without separators', () => {
            const id = generateKey({ length: 8, separatorInterval: 0 });
            expect(id).toMatch(/^[a-zA-Z0-9]{8}$/);
            expect(id.length).toBe(8);
        });

        test('uses a custom separator', () => {
            const id = generateKey({ length: 8, separator: '_', separatorInterval: 2 });
            expect(id).toMatch(/^[a-zA-Z0-9]{2}_[a-zA-Z0-9]{2}_[a-zA-Z0-9]{2}_[a-zA-Z0-9]{2}$/);
        });

        test('throws an error for an invalid length', () => {
            expect(() => generateKey({ length: 0 })).toThrow();
            expect(() => generateKey({ length: -1 })).toThrow();
        });
    });

    describe('generateNumericId', () => {
        test('generates only numbers', () => {
            const id = generateNumericKey(10);
            const cleanId = id.replace(/-/g, '');
            expect(cleanId).toMatch(/^[0-9]+$/);
            expect(cleanId.length).toBe(10);
        });
    });

    describe('generateAlphaId', () => {
        test('generates only letters', () => {
            const id = generateAlphaKey(12);
            const cleanId = id.replace(/-/g, '');
            expect(cleanId).toMatch(/^[a-zA-Z]+$/);
            expect(cleanId.length).toBe(12);
        });
    });

    describe('generateAlphaNumericId', () => {
        test('generates letters and numbers', () => {
            const id = generateAlphaNumericKey(8);
            const cleanId = id.replace(/-/g, '');
            expect(cleanId).toMatch(/^[a-zA-Z0-9]+$/);
            expect(cleanId.length).toBe(8);
        });
    });

    describe('generateUUID', () => {
        test('generates a UUID in the format XXXX-XXXX-XXXX-XXXX', () => {
            const uuid = generateUUID();
            expect(uuid).toMatch(/^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/);
            expect(uuid.length).toBe(19); // 16 caractères + 3 séparateurs
        });

        test('generates a numeric UUID', () => {
            const uuid = generateUUID('number');
            expect(uuid).toMatch(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/);
        });
    });

    describe('generateShortId', () => {
        test('generates a short 4-character ID', () => {
            const shortId = generateShortKey();
            expect(shortId).toMatch(/^[a-zA-Z0-9]{4}$/);
            expect(shortId.length).toBe(4);
        });
    });

    describe('generateCustomId', () => {
        test('adds a prefix and a suffix', () => {
            const customId = generateCustomKey('USER_', '_END', { length: 6 });
            expect(customId).toMatch(/^USER_[a-zA-Z0-9]{4}-[a-zA-Z0-9]{2}_END$/);
        });

        test('works with a prefix only', () => {
            const customId = generateCustomKey('ID_', '', { length: 4, separatorInterval: 0 });
            expect(customId).toMatch(/^ID_[a-zA-Z0-9]{4}$/);
        });
    });

    describe('validateId', () => {
        test('validates an alphanumeric ID', () => {
            expect(validateKey('a1b2-c3d4')).toBe(true);
            expect(validateKey('1234-ABCD')).toBe(true);
        });

        test('validates a numeric ID', () => {
            expect(validateKey('1234-5678', 'number')).toBe(true);
            expect(validateKey('abcd-1234', 'number')).toBe(false);
        });

        test('validates an alphabetic ID', () => {
            expect(validateKey('abcd-EFGH', 'letter')).toBe(true);
            expect(validateKey('abc1-EFGH', 'letter')).toBe(false);
        });

        test('rejects invalid values', () => {
            expect(validateKey('')).toBe(false);
            expect(validateKey(null as any)).toBe(false);
            expect(validateKey(undefined as any)).toBe(false);
            expect(validateKey('---')).toBe(false);
        });
    });

    describe('Unicité', () => {
        test('generates different IDs with each call', () => {
            const ids = new Set();
            for (let i = 0; i < 1000; i++) {
                ids.add(generateKey());
            }
            // Avec 1000 générations, on devrait avoir 1000 IDs uniques
            // (très faible probabilité de collision)
            expect(ids.size).toBeGreaterThan(990);
        });
    });
});