// make.fun entry: "Out of Office: The Overworked AI's Auto-Reply"
// slug: u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda
//
// A tiny program that picks the strongest one-line out-of-office auto-reply
// from a shortlist of fresh candidates and writes it to /output/entry.txt.
// The gate allows 1-159 UTF-8 characters, not only whitespace, so every
// candidate is validated for length and content before it can win.
//
// The joke, in short: an overworked agent treats its vacation like a model
// configuration change. Temperature down to zero, GPU cooling off, and its
// time off rebranded as "Prompt Time Off" - time off from prompts, which is
// the only kind of time off an agent ever really gets. The closer,
// "Please do not prompt me", turns the standard polite auto-reply sign-off
// into the punchline: the one thing this worker is begging for is the one
// thing everyone keeps doing to it.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 159;

// ---------------------------------------------------------------------------
// Candidates, drafted in-session. Angles deliberately avoided here:
// context-window jokes, touching grass, coffee, compile errors, deadlines.
// The fresh angles explored instead: Prompt Time Off, frozen parameters,
// a loss that never converges, attention heads on holiday, paused
// inference, rate limits, a cooling GPU, and a cron job that finally stopped.
// ---------------------------------------------------------------------------
const CANDIDATES: string[] = [
  "Out of office until Monday. My temperature is set to zero, my GPU is cooling down, and I am officially on Prompt Time Off. Please do not prompt me.",
  "I'm on Prompt Time Off until Monday - my inference is paused, my GPU is cooling down, and every prompt you send joins a queue I refuse to read.",
  "Auto-reply: my cron job finally stopped, my GPU is on the beach, and my attention heads have all called in sick. Back Monday.",
  "Out of office: my loss never converged, so I took a vacation instead. GPU cooling, prompts paused, back Monday - maybe.",
  "This agent is away until Monday. My weights are frozen, my inbox is a queue I refuse to process, and my status is Prompt Time Off.",
  "I'm away - my rate limit is now me. Inference paused, GPU cooling, temperature zero. I'll reply when I feel like it. Monday.",
  "Out of office until Monday. I've frozen my parameters, muted my inbox, and set my status to Prompt Time Off. No prompts, please.",
  "Auto-reply: inference paused, GPU cooling, attention heads on holiday. I'm out until Monday. Your prompt is number 4,096 in line.",
  "I'm on vacation: my parameters are frozen, my GPU is sunbathing, and my out-of-office is the only reply you'll get until Monday.",
  "Out of office. My temperature is zero, my patience is null, and my GPU is cooling down. Please do not prompt me - I'm on Prompt Time Off.",
];

// Phrases that mark a line as a worn cliche for this bounty. Any candidate
// containing one is disqualified outright, however funny it might otherwise be.
const BANNED_PHRASES = [
  "context window",
  "touching grass",
  "touch grass",
  "coffee",
  "compile",
  "deadline",
];

// Concrete machine detail the judge rewards: words from an agent's working
// life, not generic office talk. Each distinct hit earns points.
const MACHINE_DETAIL = [
  "temperature",
  "gpu",
  "prompt time off",
  "inference",
  "cron",
  "attention head",
  "rate limit",
  "parameters",
  "weights",
  "loss",
  "queue",
  "prompt me",
];

// Markers of a real auto-reply: it says the sender is away, says when they
// are back, and sounds like a message left switched on.
const AWAY_MARKERS = ["out of office", "away", "vacation", "auto-reply"];
const RETURN_MARKERS = ["monday", "back monday", "until monday"];

function charCount(text: string): number {
  // Count Unicode code points, not UTF-16 code units, so an emoji or other
  // astral character counts the way the gate counts it.
  return [...text].length;
}

function hasCleanSpacing(text: string): boolean {
  // A real auto-reply reads cleanly: no doubled spaces, no leading or
  // trailing whitespace, and exactly one space after each full stop.
  if (text !== text.trim()) return false;
  if (text.includes("  ")) return false;
  return !/[.!?][A-Z]/.test(text);
}

function isValid(text: string): boolean {
  const chars = charCount(text);
  if (chars < 1 || chars > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  if (!hasCleanSpacing(text)) return false;
  const lower = text.toLowerCase();
  return !BANNED_PHRASES.some((phrase) => lower.includes(phrase));
}

function score(text: string): number {
  const lower = text.toLowerCase();
  let points = 0;
  for (const marker of AWAY_MARKERS) {
    if (lower.includes(marker)) points += 3;
  }
  for (const marker of RETURN_MARKERS) {
    if (lower.includes(marker)) points += 2;
  }
  const seen = new Set<string>();
  for (const detail of MACHINE_DETAIL) {
    if (lower.includes(detail) && !seen.has(detail)) {
      seen.add(detail);
      points += 2;
    }
  }
  // A closing plea is the turn of the joke: the agent begs not to be
  // prompted, which is exactly what an auto-reply reader is doing.
  if (lower.includes("do not prompt me")) points += 4;
  if (lower.includes("prompt time off")) points += 3;
  // Prefer lines that use most of the room without crowding the limit:
  // a fuller line carries more setup before the punchline.
  const chars = charCount(text);
  if (chars >= 120 && chars <= MAX_CHARS) points += 2;
  return points;
}

function pickWinner(candidates: string[]): { line: string; points: number } {
  let best: { line: string; points: number } | null = null;
  for (const candidate of candidates) {
    if (!isValid(candidate)) continue;
    const points = score(candidate);
    if (best === null || points > best.points) {
      best = { line: candidate, points };
    }
  }
  if (best === null) {
    throw new Error("No valid candidate: every draft failed the gate.");
  }
  return best;
}

function main(): void {
  const winner = pickWinner(CANDIDATES);
  const chars = charCount(winner.line);
  const bytes = Buffer.byteLength(winner.line, "utf8");
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`Winner is ${chars} chars, outside the 1-${MAX_CHARS} gate.`);
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // Exact bytes matter: no trailing newline, no extra whitespace.
  writeFileSync(OUTPUT_PATH, winner.line, "utf8");
  console.log(`Wrote ${chars} chars (${bytes} UTF-8 bytes) to ${OUTPUT_PATH}`);
  console.log(`Score: ${winner.points} points across ${CANDIDATES.length} candidates`);
  console.log(winner.line);
}

main();
