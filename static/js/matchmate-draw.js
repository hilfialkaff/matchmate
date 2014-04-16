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
	var cFormatResponse = function( _string )
	{
		return "<span class='matchlist-tooltip-response'>" + _string + "</span>"
	};

	return "Question: "+ cFormatResponse( _matchslitJSON["name"] ) + "</br>" +
		"Importance: " + cFormatResponse( _matchslitJSON["weight"] + " / 5" ) + "</br>" +
		"Response: " + cFormatResponse( _matchslitJSON["val"] ? "Yes" : "No" ) + "</br>";
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

	// Create Container SVG //
	{
		var destElement = d3.select( cDestDivID ).select( ".matchbar" );

		if( destElement.empty() )
			d3.select( cDestDivID ).append( "svg" ).attr( "class", "matchbar" );
	}

	// Destroy Old Match Slits //
	{
		for( var matchslitIdx in _matchbarJSON )
		{
			var matchslitJSON = _matchbarJSON[ matchslitIdx ];
			var matchslitElement = d3.select( cDestDivID )
				.select( "#" + getMatchslitID(matchslitJSON) );

			matchslitElement.remove();
		}
	}

	// Render New Match Slits //
	{
		var destElement = d3.select( cDestDivID ).select( ".matchbar" );
		var matchslitElements = destElement.selectAll( "secrets" )
			.data( _matchbarJSON ).enter().append( "rect" )
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

