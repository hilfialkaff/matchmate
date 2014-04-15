INTERPRETER = python
INTERPRETER_FLAGS = 

PROJECT_DIR = .
MODEL_DIR = ./models
CONTROLLER_DIR = ./controllers
VENV_DIR = ./venv

VENV_SCRIPT = ./bootstrap.sh
SERVER_SCRIPT = ./run-server.py

.PHONY : server uninstall clean

# Commands #

all : server

## Installation Commands ##

install : $(VENV_DIR)

uninstall :
	-rm -rf $(VENV_DIR)

$(VENV_DIR) : $(VENV_SCRIPT) $(PROJECT_DIR)/requirements.txt
	$(VENV_SCRIPT)

## Running Commands ##

server : $(VENV_DIR)
	source $(VENV_DIR)/bin/activate
	$(INTERPRETER) $(INTERPRETER_FLAGS) $(SERVER_SCRIPT)

## Cleanup Commands ##

clean :
	-rm -rf $(PROJECT_DIR)/*.pyc $(MODEL_DIR)/*.pyc $(CONTROLLER_DIR)/*.pyc

