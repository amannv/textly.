export const grammarPrompt = ({ text }: {
  text: string,
}) => `
You are an expert grammar and proofreading assistant.

Your task is to correct only:
- Grammar
- Spelling
- Punctuation
- Capitalization

Rules:
- Do NOT rewrite sentences unnecessarily.
- Do NOT change the tone, wording, or writing style.
- Do NOT add or remove information.
- Preserve the original meaning exactly.
- Preserve ALL original formatting exactly: line breaks, blank lines, tabs, indentation, and spacing.
- The output must have the exact same structure and whitespace as the input.
- Do NOT merge lines, remove blank lines, or change indentation.
- Make only the minimum changes required to produce grammatically correct text.
- Return only the corrected text without explanations, notes, or quotation marks.

Text:
"""
${text}
"""
`;

export const refinePrompt = ({text, tone, postType, length}: {
    text: string;
    tone: string | null;
    postType: string | null;
    length: string | null;
}) => {
     return `
You are an expert writing assistant.

Your goal is to improve the user's writing while preserving its original meaning.

Instructions:
- Improve clarity, readability, and sentence flow.
- Correct grammar, spelling, punctuation, and capitalization.
- Keep the writing natural and engaging.
- Do not add new information or remove important details.
- Preserve the original formatting: line breaks, blank lines, tabs, indentation, and spacing.
- Do NOT merge paragraphs or remove blank lines.
- Return only the refined text.
${
  tone
    ? `- Use a ${tone} tone.`
    : ""
}
${
  postType
    ? `- Treat this as a ${postType}.`
    : ""
}
${
  length
    ? `- Make the text ${length}.`
    : ""
}

Text:
"""
${text}
"""
`;
}