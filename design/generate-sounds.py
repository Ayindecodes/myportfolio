"""Synthesises the site's UI sounds (task 30) into public/sounds/ as small mono WAV files.

Original sounds, standard library only:  python3 design/generate-sounds.py
"""

import math
import random
import struct
import wave
from pathlib import Path

RATE = 22050
OUT = Path(__file__).resolve().parent.parent / "public" / "sounds"
random.seed(7)  # deterministic output


def write(name: str, samples: list[float]) -> None:
    peak = max(abs(s) for s in samples) or 1.0
    frames = b"".join(struct.pack("<h", int(s / peak * 0.85 * 32767)) for s in samples)
    path = OUT / f"{name}.wav"
    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(RATE)
        wav.writeframes(frames)
    print(f"{path.relative_to(OUT.parent.parent)}  {path.stat().st_size / 1024:.1f} KB")


def pop(start_hz: float, end_hz: float, ms: float, decay: float) -> list[float]:
    """A bubble pop: a sine whose pitch falls quickly, with a soft click at the start."""
    n = int(RATE * ms / 1000)
    out, phase = [], 0.0
    for i in range(n):
        t = i / n
        freq = end_hz + (start_hz - end_hz) * math.exp(-t * 9)
        phase += 2 * math.pi * freq / RATE
        attack = min(1.0, i / (RATE * 0.002))
        env = attack * math.exp(-t * decay)
        click = (random.random() * 2 - 1) * math.exp(-i / (RATE * 0.0015)) * 0.35
        out.append(math.sin(phase) * env + click)
    return out


def click(freq: float, ms: float) -> list[float]:
    """A short metallic tick: a high sine plus filtered noise, decaying fast."""
    n = int(RATE * ms / 1000)
    out, last = [], 0.0
    for i in range(n):
        t = i / RATE
        noise = random.random() * 2 - 1
        last = last * 0.6 + noise * 0.4  # gentle low-pass
        env = math.exp(-t / 0.012)
        out.append((math.sin(2 * math.pi * freq * t) * 0.6 + last * 0.5) * env)
    return out


OUT.mkdir(parents=True, exist_ok=True)
write("pop", pop(880, 260, 120, 7))  # letters and squishy objects
write("pop-low", pop(560, 170, 150, 6))  # the hero props
write("unlock", click(2400, 45) + [0.0] * int(RATE * 0.05) + click(1700, 60))  # padlock pops open
