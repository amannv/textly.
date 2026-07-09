"use client";
import { Copy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import ToneSelector from "@/components/ToneSelector";
import TypeSelector from "@/components/TypeSelector";
import LengthSelector from "@/components/LengthSelector";
import { grammarPrompt, refinePrompt } from "../utils/prompt";
import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tone, setTone] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [copy, setCopy] = useState(false);
  const fullTextRef = useRef<string>("");

  const startTypewriter = useCallback((text: string) => {
    fullTextRef.current = text;
    setDisplayedText("");
    setIsTyping(true);
    setResult(text);
  }, []);

  useEffect(() => {
    if (!isTyping) return;
    setLoading(true);

    let charIndex = 0;
    const fullText = fullTextRef.current;

    if (!fullText) {
      console.error("Error while refining text!");
    }

    const interval = setInterval(() => {
      charIndex++;
      setDisplayedText(fullText.slice(0, charIndex));

      if (charIndex % 5 === 0) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }

      if (charIndex >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
        setLoading(false);
        setCopy(true);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isTyping]);

  const handleCorrectGrammar = async () => {
    try {
      if (textRef.current?.value === "") {
        console.error("Paste some text to refine");
        return;
      }

      setLoading(true);
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
      if (textRef.current?.value === "") {
        console.error("Paste some text to refine");
        return;
      }

      setLoading(true);
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

  const copyResult = () => {
    try {
      if (!fullTextRef.current) return;
      navigator.clipboard.writeText(fullTextRef.current);
    } catch (e) {
      console.error("Error while copying result!");
    }
  };

  const clearInput = () => {
    setTone(null);
    setLength(null);
    setType(null);
    setResult(null);
    setDisplayedText("");
    setIsTyping(false);
    setLoading(false);
    setCopy(false);
    fullTextRef.current = "";
  }

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center w-full min-h-screen h-full max-w-2xl mx-auto gap-6 pt-[calc(50vh-10rem)]">
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
          <div className="relative">
            <Textarea
              ref={textRef}
              maxLength={5000}
              className="pr-10"
              placeholder="Paste your email, blog, social media caption, essay, or any text..."
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (textRef.current) textRef.current.value = "";
                clearInput();
              }}
              title="Clear input"
              className="absolute top-2 right-2 h-7 w-7 transition-all duration-200 active:scale-90 cursor-pointer"
            >
              <X size={14} />
            </Button>
          </div>
          <div className="flex items-center justify-center w-full gap-2">
            <TypeSelector value={type} setValue={setType} />
            <ToneSelector value={tone} setValue={setTone} />
            <LengthSelector value={length} setValue={setLength} />
            <Button
              disabled={loading}
              onClick={handleCorrectGrammar}
              variant={"default"}
              size={"lg"}
              className="min-w-35"
            >
              {loading ? <Spinner /> : "Correct Grammar"}
            </Button>
            <Button
              disabled={loading}
              onClick={handleRefineText}
              variant={"default"}
              size={"lg"}
              className="min-w-20"
            >
              {loading ? <Spinner /> : "Refine"}
            </Button>
          </div>
          {result && (
            <div
              ref={resultRef}
              className="relative animate-slide-down-fade min-h-30 w-full rounded-md border border-border/60 bg-white/70 backdrop-blur-sm px-2 py-2 pr-10 text-sm text-foreground md:text-xs/relaxed dark:border-input dark:bg-input/30 dark:backdrop-blur-none scrollbar-none whitespace-pre-wrap mb-20"
            >
              {copy && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    copyResult();
                    setCopy(false);
                    setTimeout(() => setCopy(true), 2000);
                  }}
                  title="Copy to clipboard"
                  className="absolute top-2 right-2 h-7 w-7 transition-all duration-200 active:scale-90 cursor-pointer"
                >
                  <Copy size={14} />
                </Button>
              )}
              {!copy && !isTyping && result && (
                <Button
                  variant="outline"
                  size="icon"
                  disabled
                  className="absolute top-2 right-2 h-7 w-7 text-primary"
                >
                  <Check size={14} />
                </Button>
              )}
              {displayedText}
              {isTyping && (
                <span className="inline-block w-0.5 h-4 bg-foreground ml-0.5 animate-pulse align-text-bottom" />
              )}
            </div>
          )}
        </div>
      </div>
      <footer className="fixed bottom-4 left-0 right-0 text-center text-sm tracking-wide text-foreground/80 dark:text-foreground/40 font-light">
        made by aman with <span className="text-primary">♥</span>
      </footer>
    </>
  );
}
