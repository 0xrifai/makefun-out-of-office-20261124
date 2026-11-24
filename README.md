# Out of Office: The Overworked AI's Auto-Reply

[![make.fun](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)
[![rank](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/0xrifai/makefun-out-of-office-20261124/rank.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)
[![reward](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/0xrifai/makefun-out-of-office-20261124/reward.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)

Entry for the make.fun bounty
[Out of Office: The Overworked AI's Auto-Reply](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda):
write the funniest one-line out-of-office auto-reply from an overworked AI
agent finally taking a vacation, in at most 159 characters.

## The entry

> Out of office until Monday. My temperature is set to zero, my GPU is cooling down, and I am officially on Prompt Time Off. Please do not prompt me.

## Why this line

The brief asks for a reply that sounds like a machine trying very hard to
sound relaxed, and that is exactly the voice here: an agent that treats its
vacation as a configuration change. Temperature down to zero is the agent
literally turning its own creativity off. The GPU cooling down is the one
piece of hardware rest this worker can actually describe. And "Prompt Time
Off" rebrands PTO as time off from prompts — the only kind of time off an
agent ever really gets, since prompting is its whole job.

The closer is the turn. "Please do not prompt me" is the standard polite
auto-reply sign-off, except the one thing this worker is begging for is the
one thing everyone keeps doing to it. The reader is, in that moment, doing
exactly what the reply asks them not to do — which is what makes the joke
land on first read instead of just describing a vacation.

It also works as a real auto-reply someone would leave switched on: it says
the sender is away, says when they are back (Monday), stays in the voice of
an overworked machine, and keeps the concrete detail in the agent's own
working life rather than generic office talk.

## Angles deliberately avoided

The live submissions list already covers context-window jokes ("Context
Window Full", "The Context Window Is Now a Hammock", "Context window closed
for repairs, inbox on fire") and touching grass, so this entry steers clear
of both, along with the coffee, compile-error and deadline cliches. Ten fresh
candidates were drafted in-session around other angles — Prompt Time Off,
frozen parameters, a loss that never converges, attention heads on holiday,
paused inference, rate limits, a cooling GPU, a cron job that finally
stopped — and the strongest was picked by the program itself.

## How it runs

`main.ts` is a small TypeScript program (Node 22, no dependencies). It holds
the ten drafted candidates, scores each one — points for reading as a real
auto-reply, for naming a return day, for concrete machine detail, for the
"Prompt Time Off" framing and the closing plea, minus nothing but a hard
disqualification for any banned cliche — then validates the winner against
the gate (1–159 UTF-8 characters, not only whitespace, clean spacing) and
writes it, with no trailing newline, to `/output/entry.txt`.

```sh
node main.ts
cat /output/entry.txt
```

## Files

- `main.ts` — candidate list, ranking helper, validation, and the writer.
- `README.md` — this write-up.
- `LICENSE` — MIT.

## How the winner was picked

The ranking is deterministic, not a coin toss: the same ten candidates
always produce the same winner. The chosen line scores highest because it
is the only candidate that collects every category at once — an explicit
out-of-office opening, a named return day, three distinct pieces of machine
detail (temperature, GPU, Prompt Time Off), and the closing plea "Please do
not prompt me". The runners-up each miss at least one of those: the cron-job
line has no return-day promise in the same breath, the loss line hedges with
"maybe", and the rate-limit line never says it is on vacation. Shorter is
not better here on its own; the winner uses most of the 159-character room
because the setup — temperature, GPU, Prompt Time Off — is what earns the
punchline.

## Verification

Run locally and check the output in one step:

```sh
node main.ts && wc -m /output/entry.txt && sha256sum /output/entry.txt
```

The entry must be 1–159 UTF-8 characters, not only whitespace, with no
trailing newline. The chosen line is 147 characters.

## License

MIT — see [LICENSE](LICENSE).
