# Rick and Morty — One-Page Brief for the Reviewing Tech Lead

*A Focus sheet (what was aimed at), a Feedback sheet (what was actually hit),
and a Management sheet (the decisions behind the diffs). One page, no digging.*

---

## 1 · Focus sheet — success areas and their indicators

| Success area | Key indicator | Target |
|---|---|---|
| Requirements | PDF requirements and optional items | All of them, including every bonus |
| Mockup fidelity | Screens vs. the Figma playground | Palette sampled from the mockup, screen by screen |
| Code health | React Doctor score, expo-doctor checks | 100/100 and 20/20 |
| Type safety | TypeScript strict + generated GraphQL types | tsc clean; API types generated, not hand-written |
| Testing | Unit tests over utils, stores, components, screens | Meaningful coverage, mocked GraphQL |
| Craft | Magic numbers and inline JSX in props | Zero of either |
| Git | History a reviewer can follow | One PR per phase, descriptive messages, CI on every push |

## 2 · Feedback sheet — actuals vs targets

| Indicator | Actual | Status |
|---|---|---|
| Requirements | List with name/image/species, A-Z / Z-A sort, detail view, favorites, comments — plus the optional TypeScript, soft delete, and search by status/species/gender | ✅ |
| Mockup | The four palette colors were sampled from the Figma export and live as Tailwind tokens; starred/characters sections, filter pills, and the advanced search screen match the frames | ✅ |
| React Doctor | **100/100** (started 83; the two findings were fixed, not suppressed) | ✅ |
| expo-doctor | **20/20** — it caught two missing native peer dependencies that would have crashed a production build | ✅ |
| Types | Strict mode from day one; `npm run codegen` generates operation types from the schema, and a mapper layer keeps the API's all-nullable types out of the app | ✅ |
| Tests | **30/30 passing** — sort comparator, filter helpers, all four stores, row interactions, and both list screens against a mocked GraphQL query | ✅ |
| Craft | Every color, size, threshold, storage key and user-facing string lives in `src/constants`; screens compose named components, nothing is passed inline as JSX | ✅ |
| Git | 10 merged PRs, one per phase of work; GitHub Actions runs typecheck + tests on every push and PR | ✅ |

## 3 · Management sheet — decisions a reviewer should know about

**Decisions taken:**

- **GraphQL, not REST.** The brief asks for GraphQL, so search and the
  species/status/gender filters are sent as `FilterCharacter` arguments and the
  server does the matching. Pagination merges through an Apollo type policy
  that deduplicates by id, so a repeated request can never produce duplicate rows.
- **Generated API types stay at the boundary.** The schema marks every field
  nullable. Instead of letting `Maybe<>` leak everywhere, `mappers.ts` converts
  API results into non-null domain interfaces and is the one place that decides
  what happens when data is missing.
- **Client state is separated from server state.** Favorites, comments, the
  soft delete and the applied filters are Zustand stores persisted to
  AsyncStorage — concerns the API has no concept of. The API is never treated
  as a place to fake them.
- **NativeWind v5 preview over v4 stable.** v4 crashes on Expo SDK 57's Metro.
  A deliberate trade-off, documented in the phase 0 PR.
- **Soft delete is honest.** Long press hides a character; a banner shows how
  many are hidden and restores them. Nothing is destroyed.

**Known limits:**

- Comments and favorites are device-local by design; there is no backend of my own.
- The species filter reflects the API's substring matching (filtering "Human"
  includes "Humanoid") — an API behavior I chose not to mask.
- The React Compiler is enabled as an experiment; manual memoization was
  removed since the compiler handles it.

**If this shipped tomorrow:**

1. E2E happy path with Maestro (list → filter → detail → comment)
2. Error tracking (Sentry) and analytics around search usage
3. Physical-device pass for the spring animations and dark mode

---

*60-second code tour:* [`src/services/`](src/services/) (Apollo, generated
types, the null boundary) → [`src/hooks/useCharacters.ts`](src/hooks/useCharacters.ts)
(one hook feeding both list screens) → [`src/store/`](src/store/) (persisted
client state) → [`src/components/`](src/components/) (grouped by feature, with
its own README). Screenshots and demo in the [README](README.md).
