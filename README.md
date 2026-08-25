# Swara Flow

Open-source Carnatic practice for swaras, patterns, and flute.

Swara Flow turns foundational exercises into a focused visual practice room. Choose an exercise, set your tonic (`Sa`) and tempo, then listen and follow the active swara.

## First prototype

- Sarali Varisai, Janta Varisai, Alankaram, and pyramid exercise categories
- Adjustable tonic and tempo
- Explicit Mayamalavagowla swaras and intervals for the starter exercises
- Browser-based Web Audio playback with compact local samples and no backend
- Selectable sampled flute or synthesized tone playback
- Animated note-by-note practice guidance
- Responsive interface for desktop and mobile

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product direction

The first release deliberately stays small: structured practice data, audio, and visual guidance. Good next additions are multiple speeds, tala/metronome support, exercise authoring, flute fingering hints, and saved practice progress.

## Architecture

The interactive practice experience lives in `features/practice` and is split by responsibility:

- `domain/` contains typed musical concepts, validated exercise data, and pure calculations.
- `audio/` defines a replaceable playback contract and the browser Web Audio implementation.
- `public/audio/` contains compact locally served sample anchors and their complete provenance.
- `hooks/` owns playback scheduling and lifecycle cleanup.
- `components/` contains the practice feature's focused UI pieces.
- `app/` remains the thin Next.js route and static page shell.

This keeps future raga catalogs, sampled instruments, tala engines, and persistence adapters independent from the UI.

### Included instruments

- **Flute:** four University of Iowa concert-flute anchors; the closest recording is pitch-adjusted for each swara.
- **Simple tone:** the original generated sine tone, retained as a dependency-free fallback.

See [`public/audio/LICENSES.md`](public/audio/LICENSES.md) for recording sources and redistribution terms. The included flute is a Western concert flute and remains a replaceable adapter until dedicated Carnatic recordings are available. Vocal playback is intentionally deferred until suitable Carnatic recordings are available.

## Curriculum source

The 14 Sarali Varisai exercises follow the Mayamalavagowla and Adi tala notation published in [Shivkumar Kalyanaraman's Carnatic music basics archive](https://www.shivkumar.org/music/basics/sarali-varisai.htm), which credits Rani, karnatik.com, and Chitravina N. Ravikiran's teaching material. A dash in the app represents a sustained beat.

## Quality checks

```bash
npm run typecheck
npm test
npm run build
```

## License

A license has not been selected yet. Add one before accepting external contributions.
