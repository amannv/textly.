import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { label: "Select tone", value: null },
  { label: "Normal", value: "normal" },
  { label: "Professional", value: "professional" },
  { label: "Friendly", value: "friendly" },
  { label: "Formal", value: "formal" },
  { label: "Casual", value: "casual" },
  { label: "Confident", value: "confident" },
  { label: "Persuasive", value: "persuasive" },
  { label: "Polite", value: "polite" },
  { label: "Concise", value: "concise" },
  { label: "Empathetic", value: "empathetic" },
  { label: "Creative", value: "creative" },
];

export default function ToneSelector() {
  return (
    <Select items={items}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tone</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
