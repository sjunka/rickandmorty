# Components

Grouped by the feature they belong to. Each folder has an `index.ts`, so screens
import from the folder rather than from individual files.

## character

The list of characters, shared by the home and advanced search screens.

- `CharacterSectionList` — the list itself, split into starred and other characters
- `CharacterRow` — one character: avatar, name, species, favorite toggle, long press to remove
- `SectionHeader` — the "STARRED CHARACTERS (2)" heading above each section
- `DeletedBanner` — how many characters are hidden by the soft delete, with a restore action

## filters

Searching and filtering.

- `SearchBar` — the name search and the button that opens the filters
- `FilterModal` — the filter sheet, holding a draft until the user applies it
- `FilterGroup` — one row of pills, such as Specie
- `FilterOption` — a single pill, which owns its own press handler
- `ResultsSummary` — the result count and active filter badge on the advanced search screen

## detail

The character detail screen.

- `DetailField` — one labelled row, such as Status / Alive
- `CommentInput` — the comment field and send button, which owns the draft text
