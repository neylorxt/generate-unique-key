# generate-unique-key

A simple and flexible unique key generator for JavaScript/TypeScript projects.

### Installation

```bash
# Using npm
npm install @neylorxt/generate-unique-key

# Using yarn
yarn add @neylorxt/generate-unique-key

# Using pnpm
pnpm add @neylorxt/generate-unique-key
```

### Updating

```bash
# Using npm
npm update @neylorxt/generate-unique-key

# Using yarn
yarn upgrade @neylorxt/generate-unique-key

# Using pnpm
pnpm update @neylorxt/generate-unique-key
```

### Base Types

```typescript
type KeyType = 'number' | 'letter' | 'default';

interface GenerateKeyOptions {
    type?: KeyType;        // Character type to use
    length?: number;       // Key length
    separator?: string;    // Separator character
    separatorInterval?: number; // Interval between separators
}
```

### Detailed Parameter Guide

#### Key Types (`type`)
- `'number'` : Uses only digits (0-9)
- `'letter'` : Uses only letters (a-z, A-Z)
- `'default'` : Uses alphanumeric characters (0-9, a-z, A-Z)

#### Length (`length`)
- Default value: 8
- Description: Number of characters in the key (excluding separators)
- Constraint: Must be greater than 0

#### Separator (`separator`)
- Default value: '-'
- Description: Character used to separate groups of characters
- Examples: '-', '_', '.', ':'

#### Separator Interval (`separatorInterval`)
- Default value: 4
- Description: Number of characters between each separator
- Example: With interval=4, "AAAA-BBBB-CCCC"

### Detailed Features with Examples

#### 1. generateKey - Main Generator
```typescript
// Basic configuration
const simpleKey = generateKey();
// => 'Ax7k9Pq2'

// Complete configuration
const customKey = generateKey({
    type: 'default',      // Character type (default/number/letter)
    length: 12,           // Total length
    separator: '-',       // Separator character
    separatorInterval: 4  // Groups of 4 characters
});
// => 'Ax7k-9Pq2-Bn4m'

// Example with different separators
const keyWithDots = generateKey({
    length: 12,
    separator: '.',
    separatorInterval: 3
});
// => 'Ax7.k9P.q2B.n4m'
```

#### 2. generateNumericKey - Numeric Keys
```typescript
// Parameters:
// - length: number of digits (default: 8)
// - separator: separator character (default: '-')
// - separatorInterval: group size (default: 4)

// Simple numeric key
const numKey = generateNumericKey();
// => '12345678'

// Formatted numeric key
const formattedNumKey = generateNumericKey(10, '-', 5);
// => '12345-67890'

// Custom formatted numeric key
const customNumKey = generateNumericKey(12, '.', 3);
// => '123.456.789.012'
```

#### 3. generateAlphaKey - Alphabetic Keys
```typescript
// Parameters same as generateNumericKey
// Uses only letters (a-z, A-Z)

const alphaKey = generateAlphaKey(8, '-', 4);
// => 'AbCd-EfGh'

// Custom format example
const customAlphaKey = generateAlphaKey(12, '_', 6);
// => 'AbCdEf_GhIjKl'
```

#### 4. generateUUID - Simplified UUID Format
```typescript
// Parameter:
// - type: character type to use (default: 'default')

const uuid = generateUUID();
// => 'a1B2-c3D4-e5F6-g7H8'

const numericUuid = generateUUID('number');
// => '1234-5678-9012-3456'

const letterUuid = generateUUID('letter');
// => 'abCD-efGH-ijKL-mnOP'
```

#### 5. generateShortKey - Short Keys
```typescript
// Parameter:
// - type: character type (default: 'default')
// Always generates a 4-character key

const shortKey = generateShortKey();
// => 'A1b2'

const numericShort = generateShortKey('number');
// => '1234'
```

#### 6. generateCustomKey - Keys with Prefix/Suffix
```typescript
// Parameters:
// - prefix: text to add at the beginning
// - suffix: text to add at the end
// - options: standard generation options

// Example with prefix and suffix
const userKey = generateCustomKey('USER-', '-2023', {
    type: 'default',
    length: 6
});
// => 'USER-A1b2C3-2023'

// Example for an order ID
const orderId = generateCustomKey('ORD-', '', {
    type: 'number',
    length: 8
});
// => 'ORD-12345678'
```

#### 7. validateKey - Key Validation
```typescript
// Parameters:
// - key: key to validate
// - type: expected type (optional)

// Simple validation
validateKey('A1b2-C3d4');  // true
validateKey('ABC-123', 'default');  // true
validateKey('123-456', 'number');   // true
validateKey('AbC-DeF', 'letter');   // true

// Invalid cases
validateKey('ABC-123', 'number');   // false (contains letters)
validateKey('123', 'letter');       // false (contains numbers)
validateKey('');                    // false (empty)
```

### Error Handling

The package includes error handling for the following cases:
- Negative or zero length
- Invalid key type
- Missing or incorrect parameters

Example of error handling:
```typescript
try {
    const key = generateKey({ length: -1 });
} catch (error) {
    console.error(error.message); // "Length must be greater than 0"
}
```

### Options Table

| Option            | Type   | Default   | Description                           |
|------------------|--------|-----------|---------------------------------------|
| type             | string | 'default' | Key type ('number', 'letter', 'default') |
| length           | number | 8         | Key length                            |
| separator        | string | '-'       | Separator character                   |
| separatorInterval| number | 4         | Interval between separators           |

## License

MIT
