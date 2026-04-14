# Exercise - Compose a dinosaur

**Mission briefing:** New hybrids need **swim**, **fly**, and **armor** capabilities without a subclass explosion.

## Tasks

In [`starter/index.js`](starter/index.js), implement:

1. **`withSwim(dino)`** - returns a new object spreading `dino` with `swim()` returning `"<name> cuts through the water"`.
2. **`withFly(dino)`** - returns a new object spreading `dino` with `fly()` returning `"<name> circles above the canopy"`.
3. **`withArmor(dino)`** - returns a new object spreading `dino` with `armorRating` defaulting to `8` if missing, and `bash()` returning `"<name> slams with armor <armorRating>"`.

Use **object spread** so you never mutate the input `dino`.

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
