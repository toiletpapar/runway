# react-interview
* columns and rows have labels
* numbers are converted into USD and rounded for display, value is preserved
* can navigate using arrow keys

* labels are frozen to top row and first column
* uses standard labeling (i.e. letters for columns, numbers for rows)
* improved performance by rendering `div` instead of `input` when inputs are not required
* can reset spreadsheet contents

TODO:
* corner cell doesn't properly hide frozen row/column labels
* using arrow keys to navigate can cause the frozen labels to look janky because users are navigating to cells hidden behind frozen labels
* scales poorly (can be mitigated by using viewport and some math to figure out which cells to render, implementing something similar to infinite scrolling)
* theming with Chakra's theme provider