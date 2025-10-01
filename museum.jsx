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
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/T_rex_skull.jpg",
      alt: "Photo of a Tyrannosaurus rex skull in a museum display case",
      credit: "Wikimedia Commons – Public Domain (CC0)",
      source: "T rex skull.jpg",
      license: "CC0 / Public Domain",
    },
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
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Triceratops%2C%20American%20Museum%20of%20Natural%20History%20(7171354635).jpg",
      alt: "Close-up photo of a Triceratops skull showing the frill and two long brow horns",
      credit: "Wikimedia Commons / CC BY 2.0",
      source: "Triceratops, American Museum of Natural History (7171354635).jpg",
      license: "CC BY 2.0",
    },
    shortFact:
      "This wide frill and three horns helped Triceratops stay safe and look big.",
    details:
      "Triceratops had two long brow horns and one nose horn. The frill protected its neck. It ate plants and lived near the end of the Cretaceous period.",
    howToSay: "try-SAIR-uh-tops",
  },
  {
    id: "stegosaurus-plate",
    name: "Stegosaurus Plate",
    emoji: "🦕",
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Stegosaurus_dorsal_plate_-_Museum_of_the_Rockies_-_2013-07-08.jpg",
      alt: "Photograph of a fossil Stegosaurus back plate in a museum",
      credit: "Wikimedia Commons / likely CC BY-SA (check file page)",
      source: "Stegosaurus dorsal plate - Museum of the Rockies - 2013-07-08.jpg",
      license: "See file page",
    },
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
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Moulage%20d%27une%20griffe%20de%20velociraptor.JPG",
      alt: "Photo of a curved Velociraptor toe claw fossil cast",
      credit: "Wikimedia Commons / see file page",
      source: "Moulage d'une griffe de velociraptor.JPG",
      license: "See file page",
    },
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
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Ammonite_2582.jpg",
      alt: "Close-up photo of a spiral ammonite fossil shell",
      credit: "Wikimedia Commons – Public Domain",
      source: "Ammonite 2582.jpg",
      license: "Public Domain",
    },
    shortFact:
      "Ammonites were ocean animals with coiled shells. They are related to today’s squids and octopuses.",
    details:
      "Ammonites lived in seas all over the world. Their spiral shells grew bigger as they grew. Many were wiped out when dinosaurs went extinct.",
    howToSay: "AM-uh-nite",
  },
  {
    id: "ankylosaurus-club",
    name: "Ankylosaurus Tail Club",
    emoji: "🔨",
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Ankylosaurus_tail_club.jpg",
      alt: "Photo of an Ankylosaurus tail club fossil",
      credit: "Wikimedia Commons / see file page",
      source: "Ankylosaurus tail club.jpg",
      license: "See file page",
    },
    shortFact:
      "This tail ended in a heavy club. Big adults could swing it hard—like a living hammer!",
    details:
      "Ankylosaurus was covered in bony armor. Scientists think it used its tail to scare enemies or to push and whack during dino disagreements.",
    howToSay: "ANG-kye-low-SORE-us",
  },
  {
    id: "parasaurolophus-crest",
    name: "Parasaurolophus Crest",
    emoji: "📯",
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Parasaurolophus_tubicen_crest.jpg",
      alt: "Photo of a Parasaurolophus skull showing the long tube-like crest",
      credit: "Wikimedia Commons / see file page",
      source: "Parasaurolophus tubicen crest.jpg",
      license: "See file page",
    },
    shortFact:
      "This tube‑shaped crest may have helped make deep, low sounds—like a dino trumpet!",
      details:
      "Parasaurolophus was a plant‑eater with a very long, hollow crest connected to its nose. Air moving through the crest may have made sounds for calls.",
    howToSay: "pair-uh-sore-AH-lo-fuss",
  },
  {
    id: "pteranodon-skeleton",
    name: "Pteranodon Skeleton",
    emoji: "🪶",
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/UCMP_Pteranodon_left.JPG",
      alt: "Skeleton of a Pteranodon with long wings in a museum",
      credit: "Wikimedia Commons / Own work (see file)",
      source: "UCMP Pteranodon left.JPG",
      license: "See file page",
    },
    shortFact:
      "Pteranodon was a flying reptile. It wasn’t a dinosaur, but it lived at the same time!",
    details:
      "Pteranodon had huge wings and a long head crest. It soared over ancient seas looking for fish.",
    howToSay: "teh-RAN-uh-don",
  },
  {
    id: "plesiosaur-vertebra",
    name: "Plesiosaur Vertebra",
    emoji: "🌊",
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Opalized_fossil_plesiosaur_vertebra_(Australia).jpg",
      alt: "Bright opalized vertebra from a plesiosaur",
      credit: "Wikimedia Commons / see file page",
      source: "Opalized fossil plesiosaur vertebra (Australia).jpg",
      license: "See file page",
    },
    shortFact:
      "Plesiosaurs swam with four strong flippers. This shiny bone is a single back bone (vertebra).",
    details:
      "Plesiosaurs were ocean reptiles with long necks and powerful paddles. Some fossils in Australia turned into colorful opal!",
    howToSay: "PLEE-zee-oh-sore",
  },
  {
    id: "diplodocus-bones",
    name: "Diplodocus Tail Bones",
    emoji: "🦴",
    image: {
      src: "https://commons.wikimedian  {\n    id: \"ankylosaurus-club\",\n    name: \"Ankylosaurus Tail Club\",\n    emoji: \"🔨\",\n    image: {\n      src: \"https://commons.wikimedia.org/wiki/Special:FilePath/Ankylosaurus_tail_club.jpg\",\n      alt: \"Photo of an Ankylosaurus tail club fossil\",\n      credit: \"Wikimedia Commons / see file page\",\n      source: \"Ankylosaurus tail club.jpg\",\n      license: \"See file page\",\n    },\n    shortFact:\n      \"This tail ended in a heavy club. Big adults could swing it hard—like a living hammer!\",\n    details:\n      \"Ankylosaurus was covered in bony armor. Scientists think it used its tail to scare enemies or to push and whack during dino disagreements.\",\n    howToSay: \"ANG-kye-low-SORE-us\",\n  },\n  {\n    id: \"parasaurolophus-crest\",\n    name: \"Parasaurolophus Crest\",\n    emoji: \"📯\",\n    image: {\n      src: \"https://commons.wikimedia.org/wiki/Special:FilePath/Parasaurolophus_tubicen_crest.jpg\",\n      alt: \"Photo of a Parasaurolophus skull with long tube-like crest\",\n      credit: \"Wikimedia Commons / see file page\",\n      source: \"Parasaurolophus tubicen crest.jpg\",\n      license: \"See file page\",\n    },\n    shortFact:\n      \"This tube‑shaped crest may have helped make deep, low sounds—like a dino trumpet!\",\n    details:\n      \"Parasaurolophus was a plant‑eater with a very long, hollow crest connected to its nose. Air moving through the crest may have made sounds for calls.\",\n    howToSay: \"pair-uh-sore-AH-lo-fuss\",\n  },\n  {\n    id: \"pteranodon-skeleton\",\n    name: \"Pteranodon Skeleton\",\n    emoji: \"🪶\",\n    image: {\n      src: \"https://commons.wikimedia.org/wiki/Special:FilePath/UCMP_Pteranodon_left.JPG\",\n      alt: \"Skeleton of a Pteranodon with long wings in a museum\",\n      credit: \"Wikimedia Commons / Own work (see file)\",\n      source: \"UCMP Pteranodon left.JPG\",\n      license: \"See file page\",\n    },\n    shortFact:\n      \"Pteranodon was a flying reptile. It wasn’t a dinosaur, but it lived at the same time!\",\n    details:\n      \"Pteranodon had huge wings and a long head crest. It soared over ancient seas looking for fish.\",\n    howToSay: \"teh-RAN-uh-don\",\n  },\n  {\n    id: \"plesiosaur-vertebra\",\n    name: \"Plesiosaur Vertebra\",\n    emoji: \"🌊\",\n    image: {\n      src: \"https://commons.wikimedia.org/wiki/Special:FilePath/Opalized_fossil_plesiosaur_vertebra_(Australia).jpg\",\n      alt: \"Bright opalized vertebra from a plesiosaur\",\n      credit: \"Wikimedia Commons / see file page\",\n      source: \"Opalized fossil plesiosaur vertebra (Australia).jpg\",\n      license: \"See file page\",\n    },\n    shortFact:\n      \"Plesiosaurs swam with four strong flippers. This shiny bone is a single back bone (vertebra).\",\n    details:\n      \"Plesiosaurs were ocean reptiles with long necks and powerful paddles. Some fossils in Australia turned into colorful opal!\",\n    howToSay: \"PLEE-zee-oh-sore\",\n  },\n  {\n    id: \"diplodocus-bones\",\n    name: \"Diplodocus Tail Bones\",\n    emoji: \"🦴\",\n    image: {\n      src: \"https://commons.wikimedia.org/wiki/Special:FilePath/Diplodocus_sp._(sauropod_dinosaur_tail_bones)_(Morrison_Formation,_Upper_Jurassic;_Carnegie_Quarry,_Dinosaur_National_Monument,_Utah,_USA)_17_(48719495002).jpg\",\n      alt: \"Row of connected tail vertebrae from Diplodocus in rock\",\n      credit: \"Wikimedia Commons / see file page\",\n      source: \"Diplodocus sp. (sauropod dinosaur tail bones) ... 17 (48719495002).jpg\",\n      license: \"See file page\",\n    },\n    shortFact:\n      \"Diplodocus had a very long tail. Some scientists think the tip could make a loud whip‑like snap!\",\n    details:\n      \"Diplodocus was a giant plant‑eater with a super‑long neck and tail. Its bones show strong muscles attached along the backbone spines.\",\n    howToSay: \"dih-PLOD-uh-kuss\",\n  }\n];\n\nconst Palette = {
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

  rin-h-screen w-full"
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
  er>
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
            <div className=\"mt-3\">\n              {f.image ? (\n                <img src={f.image.src} alt={f.image.alt} loading=\"lazy\" decoding=\"async\" className=\"w-full h-40 object-cover rounded-xl border border-stone-200\" />\n              ) : (\n                f.svg\n              )}\n            </div>
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

      <figure className=\"mt-4\">\n        {fossil.image ? (\n          <>\n            <img\n              src={fossil.image.src}\n              alt={fossil.image.alt}\n              loading=\"eager\"\n              className=\"w-full max-h-80 object-contain rounded-2xl bg-white border border-stone-200\"\n            />\n            <figcaption className=\"mt-2 text-xs text-stone-600\">\n              Image: {fossil.image.credit} — <span className=\"underline decoration-dotted\">{fossil.image.source}</span>. License: {fossil.image.license}.\n            </figcaption>\n          </>\n        ) : (\n          fossil.svg\n        )}\n      </figure>

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
