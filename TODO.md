1) Make unimplemented sections invisible
2) Fine tune the "CHOSEN MOVES" section
I'd now like to tweak some things on the Team Roster portion of the Team Builder. For each of the moves, I'd like it to include 2 rows of info, like this:
[Move Name] (sticker)
T | X | P | A | G | H | AP | Y

where:
T = Type (but only the square icon, not the text or name of the type)
X = M for Melee, R for Ranged, or S for Status
P = Power
A = Accuracy
G = Targets (either the string 'Single' or 'Team' or 'Self')
H = Num Hits (displayed as 1x or 3x)
AP = Use Cost (displayed with the letter 'AP' after the number)
Y = Priority (displayed with a '+' followed by a number)

Any information that is not applicable gets replaced with '-'.

Examples:
Spit
[typeless icon] | R | 30 | 100% | Single | 1 | 0 AP | +0

Rapid Fire (sticker)
[fire icon] | R | 30 | 100% | Single | 3 | 5 AP | +1

Raise Arms (sticker)
[typeless icon] | S | - | 100% | Self | - | 1 AP | +0

3) Fix sprite resizing as you add moves
4) make the url update as you make changes
5) Show Possible Fusion sprites in 'Fusion Explorer' tab
6) possibly implement a fusion stat calculator as well???
7) Clean up AI text in README, and code comments