/// JavaScript support. Includes [snippet](#lang-javascript.snippets)
/// and local variable completion.
/*
import {
    continuedIndent,
    delimitedIndent, flatIndent,
    foldInside,
    foldNodeProp, indentNodeProp,
    Language,
    LanguageSupport, LRLanguage
} from "@codemirror/language";
import {LRParser} from "@lezer/lr";

export const javascriptLanguage = LRLanguage.define({
    name: "kotlin",
    parser: LRParser(),
    languageData: {
        closeBrackets: {brackets: ["(", "[", "{", "'", '"', "`"]},
        commentTokens: {line: "//", block: {open: "/!*", close: "*!/"}},
        indentOnInput: /^\s*(?:case |default:|\{|}|<\/)$/,
        wordChars: "$"
    }
})

export function javascript() {
    let completions: [string] = [] as unknown as [string]
    return new LanguageSupport(Language., [
        javascriptLanguage.data.of({
            autocomplete: completions
        })
    ])
}*/
