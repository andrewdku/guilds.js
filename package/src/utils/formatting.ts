/** Utilities for formatting text with Discord */
export const Formatting = {
    /** Format text as a full block quote covering multiple lines */
    blockQuote: (text: string) => `>>> ${text}` as const,

    /** Format text as **bold** */
    bold: (text: string) => `**${text}**` as const,

    /** Format text as `inline code` */
    code: (text: string) => `\`${text}\`` as const,

    /** Format text as a small gray footer */
    footer: (text: string) => `-# ${text}` as const,

    /** # Format text as an h1 header (largest) */
    h1: (text: string) => `# ${text}` as const,

    /** ## Format text as an h2 header (medium) */
    h2: (text: string) => `## ${text}` as const,

    /** ### Format text as an h3 header (smallest) */
    h3: (text: string) => `### ${text}` as const,

    /** Format text as *italic* */
    italic: (text: string) => `*${text}*` as const,

    /** > Format text as a quote */
    quote: (text: string) => `> ${text}` as const,

    /** Format text as a ~~strikethrough~~ */
    strikethrough: (text: string) => `~~${text}~~` as const,

    /** Format text to be underlined */
    underline: (text: string) => `__${text}__` as const,

    /**
     *```js
     * console.log("Format text as a code block, with optional programming language");
     * ```
     */
    codeBlock: (text: string, language?: string) =>
        language
            ? (`\`\`\`${language}\n${text}\n\`\`\`` as const)
            : (`\`\`\`\n${text}\n\`\`\`` as const),
};
