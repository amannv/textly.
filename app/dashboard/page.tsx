"use client";
import { Button } from "@/components/ui/button";
import LengthSelector from "@/components/LengthSelector";
import { Textarea } from "@/components/ui/textarea";
import ToneSelector from "@/components/ToneSelector";
import TypeSelector from "@/components/TypeSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { grammarPrompt, refinePrompt } from "../utils/prompt";
import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tone, setTone] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [result, setResult] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fullTextRef = useRef<string>("");
  const resultSectionRef = useRef<HTMLDivElement>(null);

  const startTypewriter = useCallback((text: string) => {
    fullTextRef.current = text;
    setDisplayedText("");
    setIsTyping(true);
    setResult(text);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isTyping) return;

    let charIndex = 0;
    const fullText = fullTextRef.current;

    const interval = setInterval(() => {
      charIndex++;
      setDisplayedText(fullText.slice(0, charIndex));

      if (charIndex >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isTyping]);

  // Auto-scroll to result when it appears
  useEffect(() => {
    if (result && resultSectionRef.current) {
      setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [result]);

  const handleCorrectGrammar = async () => {
    try {
      const prompt = grammarPrompt({
        text: textRef.current?.value || "",
      });
      const response = await axios.post("/api/refine", {
        prompt,
      });
      const data = response.data as { text: string };
      startTypewriter(data.text);
    } catch (e) {
      console.error("Error while correcting grammar!");
    }
  };

  const handleRefineText = async () => {
    try {
      const prompt = refinePrompt({
        text: textRef.current?.value || "",
        tone: tone,
        postType: type,
        length: length,
      });
      const response = await axios.post("/api/refine", {
        prompt,
      });
      const data = response.data as { text: string };
      startTypewriter(data.text);
    } catch (e) {
      console.error("Error while refining text!");
    }
  };

  return (
    <>
      {/* Hero section — always centered, never moves */}
      <div className="relative flex flex-col justify-center items-center w-full h-screen max-w-2xl mx-auto gap-6">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div>
          <h1 className="font-extrabold text-5xl text-foreground">
            paste your{" "}
            <span className="font-extrabold text-5xl text-primary">text </span>
            <span className="font-extrabold text-5xl text-foreground">
              below!
            </span>
          </h1>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Textarea ref={textRef} placeholder="paste your text here!" />
          <div className="flex items-center justify-center w-full gap-2">
            <TypeSelector value={type} setValue={setType} />
            <ToneSelector value={tone} setValue={setTone} />
            <LengthSelector value={length} setValue={setLength} />
            <Button
              onClick={handleCorrectGrammar}
              variant={"default"}
              size={"lg"}
            >
              Correct Grammar
            </Button>
            <Button onClick={handleRefineText} variant={"default"} size={"lg"}>
              Refine
            </Button>
          </div>
        </div>
      </div>

      {/* Result section — below the fold, scrolled into view */}
      {result && (
        <div
          ref={resultSectionRef}
          className="w-full max-w-2xl mx-auto px-4 pt-8 pb-16"
        >
          <div className="animate-slide-down-fade min-h-30 w-full rounded-md border border-input bg-input/10 px-4 py-4 text-sm text-foreground md:text-xs/relaxed dark:bg-input/30 scrollbar-none">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-4 bg-foreground ml-0.5 animate-pulse align-text-bottom" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
