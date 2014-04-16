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

/// Module Functions ///

// Helper Functions //

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
	return "matchslit" + " " +
		"matchslit-" + (_matchslitJSON[ "val" ] ? "yes" : "no") + " " +
		"category-" + CATID2CATABBREV[ _matchslitJSON["category"] ];
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

	var cMatchslitMaxWidth = cDestDivWidth;
	var cMatchslitMaxHeight = Math.floor( cDestDivHeight / MAX_MATCHSLIT_COUNT );

	var cGetMatchslitY = function( _matchslitJSON )
	{
		var matchslitID = _matchslitJSON[ "qid" ] - 1;
		var matchslitCATID = _matchslitJSON[ "category" ] - 1;

		return ( cMatchslitMaxHeight * matchslitID ) +
			( 5 * cMatchslitMaxHeight * matchslitCATID );
	};

	// Functionality //
	var destElement = d3.select( cDestDivID ).append( "svg" )
		.attr( "class", "matchbar" );

	var matchslitElements = destElement.selectAll( "matchslit" )
		.data( _matchbarJSON ).enter().append( "rect" )
		.attr( "id", getMatchslitID )
		.attr( "class", getMatchslitClass )
		.attr( "x", 0 )
		.attr( "y", cGetMatchslitY )
		.attr( "width", cMatchslitMaxWidth )
		.attr( "height", cMatchslitMaxHeight );
		/*.attr( "rx", )
		.attr( "ry", )
		.attr( "stroke-width", );*/
}

