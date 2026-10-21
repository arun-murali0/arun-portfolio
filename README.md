# Arun Murali — Editorial Portfolio

React portfolio (Editorial design) with project case studies, restrained Framer Motion transitions and small decorative scatter effects.

## Stack

React 19 · Vite · Tailwind CSS v4 · Framer Motion

## Run

```bash
npm install
npm run dev        # development
npm run build      # production build
npm run preview    # preview the build
```

## Editing content

**Everything you read on the site lives in one file: `src/data/data.json`.** Components only render it, so you never touch JSX to change words.

| Key | Controls |
| --- | --- |
| `site` | Name, title, email, socials, role line, page title, scope note |
| `nav` | Header links |
| `hero` | Eyebrow, headline (with highlighted part), intro, focus aside, buttons |
| `projectsSection` | Heading, intro, reserved-slot note, empty message |
| `filters` | Filter buttons (first one is "show all"; others match a project's `category`) |
| `approach` | Heading, intro and the three principles |
| `contact` | Heading, text, button labels (email comes from `site.email`) |
| `footer` | Tagline |
| `reservedSlots` | The dashed "next case study" placeholders |
| `projects` | The case studies (below) |

### Add or change a project

Append an object to `projects` (copy an existing one). Fields:

- `slug`, `number`, `category`, `title`, `shortTitle`, `descriptor`, `summary`, `tags[]`
- `status`, `statusTone` (`caution` or `progress`), `featured`, `role`
- `repositoryUrl`, `repositoryLabel` (leave `repositoryUrl` empty for a private repo)
- `caseStudy`: `eyebrow`, `title`, `subtitle`, `snapshot[{label,value}]`, `sections[]`

Each section has `id`, `label`, `eyebrow`, `title`, and any of: `paragraphs[]`, `bullets[]`, `architecture[{step,title,detail}]`, `table{headers,rows}`, `callout{label,text,tone}`. Sections you leave out simply do not render. If you add a category, add it to `filters` too.

The project opened is selected by the `?project=<slug>` query parameter, so refresh and the back button work.
