import type { ThemeRegistration } from 'shiki'

// Syntax theme of crystal-lang.org, ported verbatim in hsl (NOTES.md §2).
// Characteristic of the theme: method names get no color — only keyword,
// constant, string and number are painted.
//
// The scopes follow what the bundled TextMate grammar for Crystal actually
// emits: class names, type annotations, enum members and ALL-CAPS constants
// all land on support.class / entity.name.type (the Rouge .nc/.no group),
// true/false/nil are keywords (.k), and symbols are constant.other.symbol
// (.ss falls in the string group). Operators, regexes, heredocs and method
// names stay sober — the first three are painted with the editor foreground
// (the theme engine inherits instead of resetting, so "unpainted" cannot be
// expressed); method names simply get no rule at all.
export const crystalTheme = {
  name: 'quartzforge',
  type: 'dark',
  colors: {
    'editor.background': '#0B1120',
    'editor.foreground': '#e6e6e6',
    'editorLineNumber.foreground': '#8a8a8a',
  },
  tokenColors: [
    // Operators stay sober, like on crystal-lang.org (Rouge .o, no token).
    // The TextMate theme engine cannot express "no color": a rule with empty
    // settings inherits the parent scope's color, so these are painted with
    // the editor foreground — visually identical to unpainted.
    {
      scope: [
        'keyword.operator.arithmetic.crystal',
        'keyword.operator.assignment.augmented.crystal',
        'keyword.operator.assignment.crystal',
        'keyword.operator.comparison.crystal',
        'keyword.operator.logical.crystal',
        'keyword.operator.macro.crystal',
        'keyword.operator.other.crystal',
      ],
      settings: { foreground: '#e6e6e6' },
    },
    // Regexes (.sr) and heredocs (.sh) fall outside the colored Rouge groups
    {
      scope: [
        'string.regexp.arbitrary-repetition.crystal',
        'string.regexp.character-class.crystal',
        'string.regexp.classic.crystal',
        'string.regexp.group.crystal',
        'string.regexp.mod-r.crystal',
        'string.unquoted.embedded.c.crystal',
        'string.unquoted.embedded.cplusplus.crystal',
        'string.unquoted.embedded.crystal.crystal',
        'string.unquoted.embedded.css.crystal',
        'string.unquoted.embedded.html.crystal',
        'string.unquoted.embedded.js.crystal',
        'string.unquoted.embedded.js.jquery.crystal',
        'string.unquoted.embedded.shell.crystal',
        'string.unquoted.embedded.sql.crystal',
        'string.unquoted.heredoc.crystal',
      ],
      settings: { foreground: '#e6e6e6' },
    },
    // _unused identifiers are not comments
    { scope: 'comment.unused.crystal', settings: { foreground: '#e6e6e6' } },
    {
      scope: [
        'keyword.control.crystal',
        'keyword.control.class.crystal',
        'keyword.control.def.crystal',
        'keyword.control.lib.crystal',
        'keyword.control.lib.type.crystal',
        'keyword.control.module.crystal',
        'keyword.control.primary.crystal',
        'keyword.control.pseudo-method.crystal',
        'keyword.control.start-block.crystal',
        'keyword.other.special-method.crystal',
        'constant.language.boolean.crystal',
        'constant.language.nil.crystal',
      ],
      settings: { foreground: '#7294d5' },
    },
    {
      scope: [
        'constant.other.symbol.crystal',
        'constant.other.symbol.interpolated.crystal',
      ],
      settings: { foreground: '#46be5a' },
    },
    {
      scope: [
        'constant.numeric.float.crystal',
        'constant.numeric.integer.binary.crystal',
        'constant.numeric.integer.decimal.crystal',
        'constant.numeric.integer.hexadecimal.crystal',
        'constant.numeric.integer.octal.crystal',
      ],
      settings: { foreground: '#c27ece' },
    },
    {
      scope: [
        'string.quoted.single.crystal',
        'string.quoted.double.crystal.mod',
        'string.quoted.double.interpolated.crystal',
        'string.quoted.other.literal.lower.crystal',
        'string.quoted.other.literal.upper.crystal',
        'string.interpolated.crystal',
        'punctuation.section.embedded.begin.crystal',
        'punctuation.section.embedded.end.crystal',
        'meta.embedded.line.crystal',
      ],
      settings: { foreground: '#46be5a' },
    },
    { scope: ['comment.line.number-sign.crystal'], settings: { foreground: '#a6a6a6', fontStyle: 'italic' } },
    {
      scope: [
        'support.class.crystal',
        'support.class.other.type-param.crystal',
        'entity.name.type.class.crystal',
        'entity.name.type.lib.crystal',
        'entity.name.type.module.crystal',
        'entity.name.lib.type.crystal',
        'entity.name.lib.type.value.crystal',
        'entity.other.inherited-class.crystal',
        'entity.other.inherited-class.lib.first.crystal',
        'entity.other.inherited-class.lib.second.crystal',
        'entity.other.inherited-class.lib.third.crystal',
        'entity.other.inherited-class.module.first.crystal',
        'entity.other.inherited-class.module.second.crystal',
        'entity.other.inherited-class.module.third.crystal',
        'variable.other.constant.crystal',
      ],
      settings: { foreground: '#cf8568' },
    },
    // Broad scope names pinned by the theme spec. First match wins, so these
    // only ever reach tokens the precise scopes above already painted.
    { scope: 'keyword', settings: { foreground: '#7294d5' } },
    { scope: 'constant', settings: { foreground: '#cf8568' } },
    { scope: 'string', settings: { foreground: '#46be5a' } },
    { scope: 'number', settings: { foreground: '#c27ece' } },
    { scope: 'symbol', settings: { foreground: '#46be5a' } },
    { scope: 'comment', settings: { foreground: '#a6a6a6', fontStyle: 'italic' } },
  ],
} as ThemeRegistration
