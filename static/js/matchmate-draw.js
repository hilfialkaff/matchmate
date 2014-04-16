/**
 * @file matchmate-draw.js
 * @author Joseph Ciurej
 * @date Spring 2014
 *
 * Container Module for All `MatchMate` Drawing Functions
 *
 * @TODO
 * - Change the return types of position values to be strings containing
 *   percentages instead of raw numbers to support dynamic resizing.
 */

/// Module Constants ///

/**
 * The amount of time in milliseconds that it takes for a match slit visual
 * element to transition in.
 */
var MATCHSLIT_TRANS_TIME = 800;

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

/**
 * Given the JSON object representing a particular match slit, this function
 * returns the tooltip content for that slit.
 */
function getMatchslitTooltip( _matchslitJSON )
{
	return "Question: " + _matchslitJSON[ "name" ] + "</br>" +
		"Importance: " + _matchslitJSON[ "weight" ] + " / 5</br>" +
		"Response: " + (_matchslitJSON[ "val" ] ? "Yes" : "No") + "</br>";
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
	// Filter Match Slits //
	
	// TODO: Time permitting, find and use a better solution.
	if ( typeof renderMatchbar.seenMatchslits == 'undefined' )
        renderMatchbar.seenMatchslits = {};

	var filteredMatchbarJSON = [];
	for( var matchlistIdx in _matchbarJSON )
	{
		var matchlistJSON = _matchbarJSON[ matchlistIdx ];
		if( !(matchlistJSON["qid"] in renderMatchbar.seenMatchslits) )
		{
			filteredMatchbarJSON.push( matchlistJSON );
        	renderMatchbar.seenMatchslits[ matchlistJSON["qid"] ] = true;
		}
	}

	// Constant Values //
	var cDestDivID = "#" + _destDivID;
	var cDestDivWidth = $( cDestDivID ).width();
	var cDestDivHeight = $( cDestDivID ).height();

	var cMatchslitMaxWidth = cDestDivWidth;
	var cMatchslitMaxHeight = Math.floor( cDestDivHeight / MAX_MATCHSLIT_COUNT );
	var cMatchslitPadding = cMatchslitMaxHeight / 16.0;

	// Constant Functions //
	var cGetMatchslitWidth = function( _matchslitJSON )
	{
		var matchslitScore = _matchslitJSON[ "weight" ];
		var matchslitWidthPercentage = matchslitScore / 5.0;

		return matchslitWidthPercentage * cMatchslitMaxWidth;
	};

	var cGetMatchslitHeight = function( _matchslitJSON )
	{
		return cMatchslitMaxHeight - 2 * cMatchslitPadding;
	};

	var cGetMatchslitX = function( _matchslitJSON )
	{
		var originXPosition = cMatchslitMaxWidth / 2.0;
		var matchslitWidth = cGetMatchslitWidth( _matchslitJSON );

		return originXPosition - (1.0 / 2.0) * matchslitWidth;
	};

	var cGetMatchslitY = function( _matchslitJSON )
	{
		var matchslitID = _matchslitJSON[ "qid" ] - 1;

		return ( cMatchslitMaxHeight * matchslitID ) +
			cMatchslitPadding;
	};

	// Render New Match Slits //
	{
		var destElement = d3.select( cDestDivID ).append( "svg" )
			.attr( "class", "matchbar" );

		var matchslitElements = destElement.selectAll( "matchslit" )
			.data( filteredMatchbarJSON ).enter().append( "rect" )
			.attr( "id", getMatchslitID )
			.attr( "class", getMatchslitClass )
			.attr( "x", cMatchslitMaxWidth / 2.0 )
			.attr( "y", cGetMatchslitY )
			.attr( "width", 0 )
			.attr( "height", cGetMatchslitHeight );

		matchslitElements.transition()
			.duration( MATCHSLIT_TRANS_TIME ).delay( 0 )
			.attr( "x", cGetMatchslitX )
			.attr( "width", cGetMatchslitWidth );
	}

	// Create Tooltips for New Match Slits //
	{
		$( ".matchslit" ).each( function() {
			var matchslitID = $( this ).attr( "id" );
			var matchslitData = d3.select( "#" + matchslitID ).datum();
			var matchslitTooltipContent = getMatchslitTooltip( matchslitData );

			$( this ).qtip( {
				content: matchslitTooltipContent,
				position: { my: "center right", at: "center left" },
				style: { classes: "qtip-rounded matchlist-tooltip" },
			} );
		} );
	}
}

