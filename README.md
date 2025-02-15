# tip-split

small tip calculator I made one evening because I got tired of arguing about who pays the extra cent.

it splits a bill across n people and shows three honest ways to handle the leftover when the math does not divide evenly. you can pick whichever feels right for the table.

## what it does

- bill amount, tip slider 0 to 30%, number of people
- shows total with tip and the plain per-person share
- shows three rounding modes side by side, with the actual amount the group ends up paying and any leftover or surplus

the three modes:

- **A. nearest cent, last person absorbs.** everyone pays the rounded share, the last person eats the few-cent difference so the receipt closes exactly.
- **B. round each share up to whole dollar.** quick when paying cash. the group pays a small surplus.
- **C. ceiling per person.** round each share up to the next cent. everyone pays the same, the group covers a tiny rounding surplus.

## the math bit

`T = bill * (1 + tip)` then `T / n` per person. if that fraction does not land on a whole cent, somebody has to give or take. the three modes are just three different answers to "who".

money math is done in integer cents inside the script so floats do not drift on you. that part bit me on a different project last year.

## run it

no build, no deps. open `index.html` in a browser. that is it.

```
git clone https://github.com/secanakbulut/tip-split.git
cd tip-split
open index.html
```

or just double-click the file.

## stack

vanilla html, css, javascript. no frameworks, no node, no package.json.

## license

PolyForm Noncommercial 1.0.0. fine for personal use, hobby projects, learning. not for resale or commercial use without asking.
