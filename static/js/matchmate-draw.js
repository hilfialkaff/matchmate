/**
 * @file matchmate-draw.js
 * @author Joseph Ciurej
 * @date Spring 2014
 *
 * Container Module for All `MatchMate` Drawing Functions
 *
 * @TODO
 * - Add functionality to the rendering to add padding between matchslit
 *   rectangles.
 */

/// Module Constants ///

/**
 * The maximum number of slits that will be contained in a given match bar rendered.
 * This number corresponds to the number of questions.
 */
var MAX_MATCHSLIT_COUNT = 25;


/// Module Functions ///

// Helper Functions //

/**
 * Given the numerical identifier for a category, this function returns the
 * string for this category.
 */
function getCategoryString( _categoryNumber )
{
	var catid2catstring = { 0 : "qt", 1 : "pt", 2 : "woa", 3 : "rg", 4 : "aos" };
	return catid2catstring[ _categoryNumber ];
}

/**
 * Given the JSON object representing a particular match slit, this function
 * returns the HTML element identifier for that slit.
 */
function getMatchslitID( _matchslitJSON )
{
	return "matchslit" + _matchslitJSON[ "qid" ];
}

/**
 * Given the JSON object representing a particular match slit, this function
 * returns the HTML classification for that slit.
 */
function getMatchslitClass( _matchslitJSON )
{
	return "matchslit " + getCategoryString( _matchslitJSON["category"] );
}

// Primary Functions //

/**
 * Renders the match bar represented by the given JSON object to the page div
 * given by the supplied identifier.
 *
 * @param _destDivID The string identifier for the destination div.
 * @param _matchbarJSON The JSON object representing the matchbar to be rendered.
 */
function renderMatchbar( _destDivID, _matchbarJSON )
{
	// Constant Values //
	var cDestDivID = "#" + _destDivID;
	var cDestDivWidth = $( cDestDivID ).width();
	var cDestDivHeight = $( cDestDivID ).height();

	var cMatchslitWidth = cDestDivWidth;
	var cMatchslitHeight = Math.floor( cDestDivHeight / MAX_MATCHSLIT_COUNT );

	// Functionality //
	var destElement = d3.select( cDestDivID );
	var matchslitElements = destElement.selectAll( "matchslit" )
		.data( _matchbarJSON ).enter().append( "rect" )
		.attr( "id", getMatchslitID )
		.attr( "class", getMatchslitClass )
		.attr( "x", 0 )
		.attr( "y", 0 )
		.attr( "width", cMatchslitWidth )
		.attr( "height", cMatchslitHeight )
		.attr( "rx", )
		.attr( "ry", )
		.attr( "stroke-width", );
}

