# TRIIN

TRIIN is available as an ES module for modern browsers and Node.js. It hashes
the intention with SHA3-512, requests eight RANDOM.ORG integers in the range
1–1,000,000,000, multiplies them exactly, and returns the hash modulo that
product. Arbitrary-precision `BigInt` is used for the hash, product, and result.

## Library

```js
import { generateTriin, getSha3_512Hash, calculateNewValue } from 'triin';

const { hash, hashInteger, randomNumbers, value } = await generateTriin('my intention');
console.log(hash, hashInteger, randomNumbers, value);

// Deterministic calculation if you already have the eight numbers:
const result = calculateNewValue(getSha3_512Hash('my intention'), [1, 2, 3, 4, 5, 6, 7, 8]);
```

`hash` is the SHA3-512 digest as lowercase hex; `hashInteger` and `value` are
`BigInt`s. To use in a browser, serve/import `triin.js` as an ES module. The
browser must permit requests to RANDOM.ORG through CORS for the network helper
to work; applications can pass a custom `fetchImpl` to `getRandomNumbers` or
`generateTriin` if they use a suitable proxy or their own source.

## Command line

With Node.js 18 or newer:

```sh
node cli.js --intention "my intention"
```

Omit the argument to be prompted for an intention. The command prints the final
number, matching the Python script's output format.
