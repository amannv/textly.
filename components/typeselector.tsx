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
  { label: "Select type", value: null },
  { label: "General", value: "general" },
  { label: "Email", value: "email" },
  { label: "Message", value: "message" },
  { label: "Blog Post", value: "blog post" },
  { label: "Resume", value: "resume" },
  { label: "Cover Letter", value: "cover letter" },
  { label: "Linkedin Post", value: "linkedin post" },
  { label: "Social Media Post", value: "social media post" },
  { label: "Essay / Assignment", value: "essay / assignment" },
];

export default function TypeSelector() {
  return (
    <Select items={items}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Post Type</SelectLabel>
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
