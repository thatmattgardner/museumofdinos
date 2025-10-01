import React, { useEffect, useMemo, useRef, useState } from "react";

// Kids Dino Fossil Museum – single‑file React site
// Notes for editors:
// • No external libraries required. Uses Tailwind classes.
// • Everything lives in one component so it’s easy to tweak text/images.
// • Add/remove fossils by editing the `FOSSILS` array.
// • Includes "Read to me" (Web Speech API) and big tap targets for kids.

const FOSSILS = [
  {
    id: "trex-skull",
    name: "T. rex Skull",
    emoji: "🦖",
    svg: (
      <svg viewBox="0 0 200 120" className="w-full h-40">
        <rect x="6" y="20" width="188" height="80" rx="10" className="fill-stone-200" />
        <path d="M20 80 C40 20, 160 20, 180 80" className="fill-none stroke-stone-600" strokeWidth="5" />
        <circle cx="60" cy="55" r="6" className="fill-stone-600" />
        <path d="M40 85 L70 85 M90 85 L120 85 M140 85 L165 85" className="stroke-stone-600" strokeWidth="5" />
      </svg>
    ),
    shortFact:
      "This giant skull came from a meat‑eating dinosaur. Its teeth were as long as bananas!",
    details:
      "Tyrannosaurus rex lived about 68–66 million years ago. It walked on two legs and had a huge head with strong jaws. A T. rex skull can be over 1.5 meters long!",
    howToSay: "tie-RAN-oh-SORE-us REX",
  },
  {
    id: "triceratops-frill",
    name: "Triceratops Frill",
    emoji: "🦕",
    svg: (
      <svg viewBox="0 0 200 120" className="w-full h-40">
        <rect x="6" y="20" width="188" height="80" rx="10" className="fill-stone-200" />
        <path d="M30 90 C60 20, 140 20, 170 90 Z" className="fill-stone-400" />
        <circle cx="60" cy="70" r="6" className="fill-white" />
        <circle cx="140" cy="70" r="6" className="fill-white" />
      </svg>
    ),
    shortFact:
      "This wide frill and three horns helped Triceratops stay safe and look big.",
    details:
      "Triceratops had two long brow horns and one nose horn. The frill protected its neck. It ate plants and lived at the end of the Cretaceous period.",
    howToSay: "try-SAIR-uh-tops",
  },
  {
    id: "stegosaurus-plate",
    name: "Stegosaurus Plate",
    emoji: "🦕",
    svg: (
      <svg viewBox="0 0 200 120" className="w-full h-40">
        <rect x="6" y="20" width="188" height="80" rx="10" className="fill-stone-200" />
        <path d="M80 95 C90 70, 110 50, 120 95 Z" className="fill-stone-500" />
        <path d="M60 95 C70 75, 90 60, 100 95 Z" className="fill-stone-400" />
      </svg>
    ),
    shortFact:
      "Plates on a Stegosaurus’s back may have helped it stay warm or look extra cool!",
    details:
      "Stegosaurus had big, bony plates in two rows along its back and four sharp tail spikes. It was a slow‑moving plant‑eater from the Jurassic period.",
    howToSay: "STEG-oh-SORE-us",
  },
  {
    id: "velociraptor-claw",
    name: "Velociraptor Claw",
    emoji: "🦅",
    svg: (
      <svg viewBox="0 0 200 120" className="w-full h-40">
        <rect x="6" y="20" width="188" height="80" rx="10" className="fill-stone-200" />
        <path d="M60 90 C80 60, 120 50, 150 80" className="fill-none stroke-stone-700" strokeWidth="10" strokeLinecap="round" />
      </svg>
    ),
    shortFact:
      "This curved claw was like a sharp hook. Velociraptor used it to hold on to prey.",
    details:
      "Velociraptor was small but fast and smart. It had feathers and a long, stiff tail. The second toe claw was large and sickle‑shaped.",
    howToSay: "veh-LOSS-ih-RAP-tor",
  },
  {
    id: "ammonite-fossil",
    name: "Ammonite Fossil",
    emoji: "🐚",
    svg: (
      <svg viewBox="0 0 200 120" className="w-full h-40">
        <rect x="6" y="20" width="188" height="80" rx="10" className="fill-stone-200" />
        <path d="M100 60 m -35 0 a 35 35 0 1 0 70 0 a 35 35 0 1 0 -70 0" className="fill-none stroke-stone-700" strokeWidth="6" />
        <path d="M100 60 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0" className="fill-stone-700" />
      </svg>
    ),
    shortFact:
      "Ammonites were ocean animals with coiled shells. They are related to today’s squids and octopuses.",
    details:
      "Ammonites lived in seas all over the world. Their spiral shells grew bigger as they grew. Many were wiped out when dinosaurs went extinct.",
    howToSay: "AM-uh-nite",
  },
];

const Palette = {
  sand: "#F7E7CE",
  sandstone: "#E9D5B6",
  cocoa: "#6B4F3A",
  teal: "#0EA5A4",
  sky: "#38BDF8",
};

function useSpeech() {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const utterRef = useRef(null);

  const speak = (text) => {
    if (!synth) return;
    if (synth.speaking) synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95; // slower for kids
    u.pitch = 1.05;
    u.lang = "en-US";
    utterRef.current = u;
    synth.speak(u);
  };

  const stop = () => {
    if (!synth) return;
    synth.cancel();
  };

  return { speak, stop, supported: !!synth };
}

export default function DinoMuseum() {
  const [view, setView] = useState({ type: "home", index: 0 });
  const { speak, stop, supported } = useSpeech();

  const fossil = useMemo(() => {
    if (view.type === "detail") return FOSSILS[view.index];
    return null;
  }, [view]);

  useEffect(() => () => stop(), [stop]);

  const goDetail = (idx) => setView({ type: "detail", index: idx });
  const goHome = () => setView({ type: "home", index: 0 });
  const next = () =>
    setView((v) => ({ type: "detail", index: (v.index + 1) % FOSSILS.length }));
  const prev = () =>
    setView((v) => ({ type: "detail", index: (v.index - 1 + FOSSILS.length) % FOSSILS.length }));

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: `radial-gradient(60% 60% at 50% 30%, ${Palette.sand} 0%, ${Palette.sandstone} 60%, ${Palette.sandstone})` }}
    >
      <header className="sticky top-0 z-10 backdrop-blur bg-white/40 border-b border-white/50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <MuseumLogo onClick={goHome} />
          <h1 className="text-2xl md:text-3xl font-extrabold text-stone-700 tracking-tight">
            Dino Fossil Museum
          </h1>
          <div className="ml-auto flex items-center gap-2">
            {view.type === "detail" && (
              <button
                onClick={goHome}
                className="px-3 py-2 rounded-2xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 text-sm md:text-base"
              >
                ◀ Back to Gallery
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {view.type === "home" ? (
          <Gallery goDetail={goDetail} />
        ) : (
          <FossilPage
            fossil={fossil}
            index={view.index}
            next={next}
            prev={prev}
            goHome={goHome}
            speak={supported ? speak : null}
          />
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-4 pb-10">
        <div className="mt-10 rounded-2xl bg-white/60 border border-white/70 p-4 md:p-5 text-stone-700 text-sm">
          <p className="font-semibold">Grown‑up note</p>
          <p>
            This site is designed for ages 6–8. Text is short and friendly, buttons are large, and the optional
            "Read to me" feature helps early readers.
          </p>
        </div>
      </footer>
    </div>
  );
}

function MuseumLogo({ onClick }) {
  return (
    <button onClick={onClick} className="group inline-flex items-center gap-2 select-none">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-200 border border-amber-300 shadow">
        🦴
      </span>
      <span className="sr-only">Home</span>
    </button>
  );
}

function Gallery({ goDetail }) {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-xl md:text-2xl font-bold text-stone-800">Explore the Gallery</h2>
        <p className="text-stone-700">
          Tap a fossil to learn more. You can use the arrows on each page to go to the next fossil.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {FOSSILS.map((f, i) => (
          <button
            key={f.id}
            onClick={() => goDetail(i)}
            className="rounded-3xl bg-white/70 border border-white/80 shadow hover:shadow-md focus:ring-4 ring-sky-300 text-left p-4 md:p-5 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden>{f.emoji}</span>
              <h3 className="text-lg md:text-xl font-bold text-stone-800">{f.name}</h3>
            </div>
            <div className="mt-3">{f.svg}</div>
            <p className="mt-3 text-stone-700 text-base">{f.shortFact}</p>
            <span className="mt-4 inline-flex items-center gap-2 self-start px-4 py-2 rounded-2xl bg-amber-100 border border-amber-200 text-amber-900 font-semibold">
              Learn More →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function FossilPage({ fossil, index, next, prev, goHome, speak }) {
  const [reading, setReading] = useState(false);

  const textToRead = `${fossil.name}. Also called ${fossil.howToSay}. ${fossil.shortFact} ${fossil.details}`;

  useEffect(() => {
    setReading(false);
  }, [fossil?.id]);

  const handleSpeak = () => {
    if (!speak) return;
    if (!reading) {
      setReading(true);
      speak(textToRead);
      // Stop flag after a bit (approximate) to re‑enable button
      const timeout = setTimeout(() => setReading(false), Math.min(20000, textToRead.length * 60));
      return () => clearTimeout(timeout);
    }
  };

  if (!fossil) return null;

  return (
    <article className="rounded-3xl bg-white/70 border border-white/80 shadow-lg p-4 md:p-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden>{fossil.emoji}</span>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-stone-800">{fossil.name}</h2>
          <p className="text-stone-600">How to say it: <em>{fossil.howToSay}</em></p>
        </div>
      </div>

      <div className="mt-4">{fossil.svg}</div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <FactCard title="Quick Fact" body={fossil.shortFact} />
        <FactCard title="Tell Me More" body={fossil.details} />
      </div>

      <div className="mt-5 flex flex-wrap gap-3 items-center">
        <button
          onClick={prev}
          className="px-4 py-3 rounded-2xl bg-sky-100 hover:bg-sky-200 border border-sky-300 text-stone-800 font-semibold"
        >
          ◀ Previous
        </button>
        <button
          onClick={next}
          className="px-4 py-3 rounded-2xl bg-teal-100 hover:bg-teal-200 border border-teal-300 text-stone-800 font-semibold"
        >
          Next ▶
        </button>
        <button
          onClick={goHome}
          className="px-4 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-stone-900 font-semibold"
        >
          Back to Gallery
        </button>
        {speak && (
          <button
            onClick={handleSpeak}
            disabled={reading}
            className="px-4 py-3 rounded-2xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 font-semibold disabled:opacity-50"
          >
            {reading ? "Reading…" : "Read to me"}
          </button>
        )}
      </div>

      <Dots index={index} total={FOSSILS.length} />
    </article>
  );
}

function FactCard({ title, body }) {
  return (
    <div className="rounded-2xl bg-white border border-stone-200 p-4">
      <h3 className="text-lg font-bold text-stone-800">{title}</h3>
      <p className="text-stone-700 text-base leading-relaxed">{body}</p>
    </div>
  );
}

function Dots({ index, total }) {
  return (
    <div className="mt-6 flex items-center gap-2" aria-label="Fossil pages">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={
            "w-3 h-3 rounded-full border border-stone-400 " +
            (i === index ? "bg-stone-700" : "bg-stone-200")
          }
        />
      ))}
      <span className="sr-only">Page {index + 1} of {total}</span>
    </div>
  );
}
