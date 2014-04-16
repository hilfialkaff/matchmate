/**
 * @file matchmate-globals.js
 * @author Efe Karakus, Joseph Ciurej
 * @date Spring 2014
 *
 * Container Module for All Global Constants for MatchMate
 *
 * @TODO
 */

/// Module Constants ///

/**
 * The maximum number of slits that will be contained in a given match bar rendered.
 * This number corresponds to the number of questions.
 */
var MAX_MATCHSLIT_COUNT = 25;

/**
 * A dictionary containing the mapping from the question category IDs stored in
 * the database to question category abbreviations (used in classification).
 */
var CATID2CATABBREV = { 1 : "qt", 2 : "pt", 3 : "woa", 4 : "rg", 5 : "aos" };

/**
 * A dictionary containing the mapping from the question category IDs stored in
 * the database to question category strings (used in display).
 */
var CATID2CATSTRING = { 
	1 : "Quality Time", 
	2 : "Physical Touch", 
	3 : "Words of Affirmation", 
	4 : "Receiving Gifts",
	5 : "Acts of Service",
};

