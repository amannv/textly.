import { grammarPrompt } from "./prompt";
import { refinePrompt } from "./prompt";

export const promptBuilder = ({
    text,
    tone,
    postType,
    length,
    grammar
}:{
    text: string;
    tone: string | null;
    postType: string | null;
    length: string | null;
    grammar: boolean;
}) => {
    if (grammar) {
        return grammarPrompt({text});
    } else {
        return refinePrompt({text, tone, postType, length});
    }
}