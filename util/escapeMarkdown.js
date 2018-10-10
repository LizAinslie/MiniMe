var replacements = [
    [ /\*/g, '\*' ],
    [ /#/g,  '\#' ],
    [ /\//g, '\/' ],
    [ /\(/g, '\(' ],
    [ /\)/g, '\)' ],
    [ /\[/g, '\[' ],
    [ /\]/g, '\]' ],
    [ /_/g,  '\_' ]
]

module.exports = string => {
    return replacements.reduce((string, replacement) => {
        return string.replace(replacement[0], replacement[1])
    }, string)
 }