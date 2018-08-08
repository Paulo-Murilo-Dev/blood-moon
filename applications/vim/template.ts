import * as Color from 'color';

import {ColorScheme, TemplateOutput} from '../../types';

function translate(fgHex: string | null, bgHex?: string) {
    const values: string[] = [];

    if (fgHex) {
        values.push(`guifg=${fgHex}`);
        values.push(
            `ctermfg=${
                Color(fgHex)
                    .ansi256()
                    .object().ansi256
            }`
        );
    }

    if (bgHex) {
        values.push(`guibg=${bgHex}`);
        values.push(
            `ctermbg=${
                Color(bgHex)
                    .ansi256()
                    .object().ansi256
            }`
        );
    }

    return values.join(' ');
}

export function generate(name: string, colors: ColorScheme): TemplateOutput {
    const content = `" Name: Blood Moon color scheme
" Maintainer: Danny Guo
" Description: Dark and bold color scheme
" URL: https://github.com/dguo/blood-moon

" Initialization """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set background=dark

if version > 580
  hi clear
  if exists("syntax_on")
    syntax reset
  endif
endif

let g:colors_name='blood-moon'

if !has('gui_running') && &t_Co != 256
  finish
endif

" Basics """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
hi Normal ${translate(colors.foreground, colors.background)}

hi IncSearch ${translate(colors.selectionText, colors.selection)}
hi MatchParen ${translate(colors.selectionText, colors.selection)}
hi Search ${translate(colors.selectionText, colors.selection)}
hi Visual ${translate(colors.selectionText, colors.selection)}

" Syntax """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
hi Comment ${translate(colors.comment)}
hi Constant ${translate(colors.magenta)}
hi String ${translate(colors.blue)}
hi Character ${translate(colors.blue)}
hi Error ${translate(colors.pink, colors.background)}
hi Identifier ${translate(colors.red)}
hi Statement ${translate(colors.green)}
hi Noise ${translate(colors.green)}
hi PreProc ${translate(colors.green)}
hi Type ${translate(colors.green)}
hi Special ${translate(colors.orange)}
hi Todo ${translate(colors.background, colors.orange)}

" UI """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
hi LineNr ${translate(colors.gray)}
hi CursorLineNr ${translate(colors.red)}
hi clear CursorLine
hi ColorColumn ${translate(null, colors.ruler)}
hi EndOfBuffer ${translate(colors.background)}
hi Folded ${translate(colors.black, colors.orange)}
hi clear VertSplit
hi VertSplit ${translate(colors.foreground, colors.background)}

" Status line """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
hi StatusLine ${translate(colors.darkRed, colors.white)}
hi StatusLineNC ${translate(colors.white, colors.darkRed)} " not-current windows
hi WildMenu ${translate(colors.darkRed, colors.lightWhite)}

" Diffs """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
hi DiffChange ${translate(colors.lightYellow, colors.background)}
hi DiffText ${translate(colors.lightBlue, colors.background)}
hi DiffAdd ${translate(colors.lightGreen, colors.background)}
hi DiffDelete ${translate(colors.lightRed, colors.background)}

" Popup menu """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
hi Pmenu ${translate(colors.background, colors.lightWhite)}
hi PmenuSel ${translate(colors.lightWhite, colors.selection)}
hi PmenuSbar ${translate(null, colors.foreground)}
hi PmenuThumb ${translate(null, colors.gray)}

" GitGutter and Signify """"""""""""""""""""""""""""""""""""""""""""""""""""""""
hi clear SignColumn

" Shell """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

" Markdown """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

" Python """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

" JavaScript """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
hi jsObjectProp ${translate(colors.red)}
hi jsObjectKey ${translate(colors.red)}
hi jsObject ${translate(colors.red)}
hi jsObjectBraces ${translate(colors.cyan)}
hi link jsBrackets jsObjectBraces
hi jsGlobalObjects ${translate(colors.foreground)}
hi link jsBuiltins jsGlobalObjects
hi link jsGlobalNodeObjects jsGlobalObjects
hi jsFuncCall ${translate(colors.yellow)}
hi link jsParens jsFuncCall
hi jsBlockLabel ${translate(colors.foreground)}
hi link jsVariableDef Identifier
hi link jsFuncArgs Identifier

" JSON """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
hi link jsonKeyword jsObjectKey

" Rust """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
`;

    return {
        fileName: `${name}.vim`,
        content
    };
}
