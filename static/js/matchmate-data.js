/**
 * @file matchbar-data.js
 * @author Joseph Ciurej
 * @date Spring 2014
 *
 * Container Module for Test Matchbar Data
 *
 * @TODO
 * - Add more contants to this module as needed.
 */

/// Module Constants ///

/**
 * A constant matchbar JSON object that represents an intermediate matchbar that
 * represents the matchbar for a person halfway completed with the survey.
 */
var TEST_MATCHBAR_INT = [
	{ "qid": 1, "category": 1, "name": "QT1", "val": true, "weight": 5 },
	{ "qid": 2, "category": 1, "name": "QT2", "val": false, "weight": 4 },

	{ "qid": 8, "category": 2, "name": "PT3", "val": false, "weight": 1 },
	{ "qid": 9, "category": 2, "name": "PT4", "val": true, "weight": 3 },
	{ "qid": 10, "category": 2, "name": "PT5", "val": true, "weight": 1 },
];

/**
 * A constant matchbar JSON object that represents an intermediate matchbar that
 * represents the matchbar for a person fully compelted with the survey.
 */
var TEST_MATCHBAR_DONE = [
	{ "qid": 1, "category": 1, "name": "QT1", "val": true, "weight": 5 },
	{ "qid": 2, "category": 1, "name": "QT2", "val": false, "weight": 4 },
	{ "qid": 3, "category": 1, "name": "QT3", "val": true, "weight": 5 },
	{ "qid": 4, "category": 1, "name": "QT4", "val": false, "weight": 2 },
	{ "qid": 5, "category": 1, "name": "QT5", "val": true, "weight": 1 },

	{ "qid": 6, "category": 2, "name": "PT1", "val": false, "weight": 1 },
	{ "qid": 7, "category": 2, "name": "PT2", "val": false, "weight": 2 },
	{ "qid": 8, "category": 2, "name": "PT3", "val": false, "weight": 1 },
	{ "qid": 9, "category": 2, "name": "PT4", "val": true, "weight": 3 },
	{ "qid": 10, "category": 2, "name": "PT5", "val": true, "weight": 1 },

	{ "qid": 11, "category": 3, "name": "WOA1", "val": true, "weight": 4 },
	{ "qid": 12, "category": 3, "name": "WOA2", "val": true, "weight": 3 },
	{ "qid": 13, "category": 3, "name": "WOA3", "val": true, "weight": 4 },
	{ "qid": 14, "category": 3, "name": "WOA4", "val": true, "weight": 5 },
	{ "qid": 15, "category": 3, "name": "WOA5", "val": true, "weight": 5 },

	{ "qid": 16, "category": 4, "name": "RG1", "val": false, "weight": 1 },
	{ "qid": 17, "category": 4, "name": "RG2", "val": false, "weight": 2 },
	{ "qid": 18, "category": 4, "name": "RG3", "val": false, "weight": 2 },
	{ "qid": 19, "category": 4, "name": "RG4", "val": true, "weight": 1 },
	{ "qid": 20, "category": 4, "name": "RG5", "val": false, "weight": 1 },

	{ "qid": 21, "category": 5, "name": "AOS1", "val": true, "weight": 5 },
	{ "qid": 22, "category": 5, "name": "AOS2", "val": false, "weight": 3 },
	{ "qid": 23, "category": 5, "name": "AOS3", "val": false, "weight": 2 },
	{ "qid": 24, "category": 5, "name": "AOS4", "val": false, "weight": 1 },
	{ "qid": 25, "category": 5, "name": "AOS5", "val": true, "weight": 5 },
];

