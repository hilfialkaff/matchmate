# MatchMate: A Visualization of Ones Relationship Values #

## Overview ##
MatchMate is an application that aims to visualize what one values in a
relationship and, based on this information, the relationship compatability
between oneself and others.  The visualization utilizes compatabiltiy
algorithms inspired by two primary sources: the [OkCupid compatability
algorithm][ok-cupid] and the [Five Languages of Love theory][5languages].

This visualization can be viewed by either accessing the currently running
instance available on the web or by running the application on your local
machine.  The running instance of MatchMate can be found [here][matchmate]
and instructions for installing the application can be found below.

## Installation ##
The following section is dedicated to instructions related to installing
and running MatchMate on a local machine.

### Software Dependencies ###

#### Required Software ####
- [Python v2.7.6][py]
- [Flask v0.10][py-flask]
- [SQLAlchemy v0.9.1][sql-alch]
- [Python VirualEnv v1.11.4][py-venv]

#### Additional Software ####
- [D3 v3.0][d3]
- [jQuery v1.11.0][jquery]
- [qTip v2.0][qtip]

### Installation Instructions ###
The following is a list of instructions that must be followed in order to run
an instance of the visualization on a machine:

- Install [pip][] through the use of a package manager (e.g. apt-get).
- Run the command `pip install virtualenv`.
- Run the command `make install`.

### Running Instructions ###
Once all the proper dependencies are installed, the visualization can
be viewed by running the commands `source ./venv/bin/activate` and `make server`
from the base directory of the visualization source and opening a web browser to
the address [localhost:8008][localhost].

## Credits ##
The following is a listing of those involved with the project along with their
contributions:

- Efe Karakus (karakus1)
    - Wrote the frontend and visualization
- Hilfi Alkaff (alkaff2)
    - Wrote the backend
- Helen Zhou (hzhou27)
    - Designed the web-page and visualization
- Josh Friedman (friedm13)
    - Curated questions and formula for the visualization
- Joe Ciurej (ciurej2)
    - Wrote the frontend visualization


[ok-cupid]: https://www.okcupid.com/help/match-percentages
[5languages]: http://www.5lovelanguages.com/
[matchmate]: http://efekarakus.com:5000/

[py]: http://www.python.org/download/releases/2.7.6/
[py-flask]: http://flask.pocoo.org/
[py-venv]: https://pypi.python.org/pypi/virtualenv
[pip]: http://www.tornadoweb.org/en/stable/

[localhost]: http://localhost:8008
[sql-alch]: http://www.sqlalchemy.org/

[jquery]: http://jquery.com/
[qtip]: http://qtip2.com/
[d3]: http://d3js.org/
