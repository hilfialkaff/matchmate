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
var CATID2CATABBREV = { 0 : "qt", 1 : "pt", 2 : "woa", 3 : "rg", 4 : "aos" };

/**
 * A dictionary containing the mapping from the question category IDs stored in
 * the database to question category strings (used in display).
 */
var CATID2CATSTRING = { 
	0 : "Quality Time", 
	1 : "Physical Touch", 
	2 : "Words of Affirmation", 
	3 : "Receiving Gifts",
	4 : "Acts of Service",
};

