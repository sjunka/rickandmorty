# Components

Grouped by the feature they belong to. Each folder has an `index.ts`, so screens
import from the folder rather than from individual files.

Screens compose these components. They do not hold markup of their own beyond
layout, and nothing is passed inline as JSX, so a screen reads as a list of the
pieces it is made of.

## common

Shared states, used wherever a screen or a list has nothing else to show.

- `EmptyState` — the "no characters match" line inside a list
- `ErrorMessage` — a failed query, shown above the list
- `LoadingFooter` — the spinner under a list while the next page loads
- `FullScreenLoader` / `FullScreenMessage` — a screen that is still loading, or cannot load

## character

The list of characters, shared by the home and advanced search screens.

- `CharacterSectionList` — the list itself, split into starred and other characters
- `CharacterRow` — one character: avatar, name, species, favorite toggle, long press to remove
- `SectionHeader` — the "STARRED CHARACTERS (2)" heading above each section
- `ListHeader` — the screen title and the A-Z / Z-A sort toggle
- `DeletedBanner` — how many characters are hidden by the soft delete, with a restore action

## filters

Searching and filtering.

- `SearchBar` — the name search and the button that opens the filters
- `FilterModal` — the filter sheet, holding a draft until the user applies it
- `FilterHeader` — its back arrow and title
- `FilterGroup` — one row of pills, such as Specie
- `FilterOption` — a single pill, which owns its own press handler
- `FilterButton` — the apply button, disabled until a filter is picked
- `AdvancedSearchHeader` — back, title and Done on the advanced search screen
- `ResultsSummary` — the result count and active filter badge

## detail

The character detail screen.

- `CharacterAvatar` — the image with the favorite heart on its corner
- `CharacterFields` — specie, status, gender, origin and location
- `DetailField` — one labelled row, such as Status / Alive
- `CommentList` — the comments and their timestamps
- `CommentInput` — the comment field and send button, which owns the draft text
