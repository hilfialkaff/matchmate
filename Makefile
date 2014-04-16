INTERPRETER = python
INTERPRETER_FLAGS = 

VENV = virtualenv
VENV_FLAGS = --clear --no-site-packages

PROJECT_DIR = .
MODEL_DIR = $(PROJECT_DIR)/models
CONTROLLER_DIR = $(PROJECT_DIR)/controllers
VENV_DIR = $(PROJECT_DIR)/venv

SERVER_SCRIPT = $(PROJECT_DIR)/run-server.py
REQUIREMENTS_FILE = $(PROJECT_DIR)/.requirements.txt

.PHONY : server uninstall clean

# Commands #

all : server

## Installation Commands ##

install : $(VENV_DIR)

uninstall :
	-rm -rf $(VENV_DIR)

$(VENV_DIR) : $(REQUIREMENTS_FILE)
	$(VENV) $(VENV_FLAGS) $(VENV_DIR)
	$(VENV_DIR)/bin/pip install -r $(REQUIREMENTS_FILE)

## Running Commands ##

server : $(VENV_DIR)
	$(INTERPRETER) $(INTERPRETER_FLAGS) $(SERVER_SCRIPT) --reset_db

## Cleanup Commands ##

clean :
	-rm -rf $(PROJECT_DIR)/*.pyc $(MODEL_DIR)/*.pyc $(CONTROLLER_DIR)/*.pyc

