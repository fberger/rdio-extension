var debug = true;
function log() {
    if (debug) {
	console.log.apply(console, arguments);
    }
}

function codeToString(f) {
    args = [];
    log(arguments);
    for (var i = 1; i < arguments.length; ++i) {
	args.push(JSON.stringify(arguments[i]));
    }
    return "(" + f.toString() + ")(" + args.join(",") + ");";
}

function injectedJs() {
    jQuery.fn.origAutoSuspenders = jQuery.fn.autoSuspenders;
    jQuery.fn.autoSuspenders = function(data, item) {
	var result = jQuery.fn.origAutoSuspenders.call(this, data, item);
	if (item) {
	    console.log(item);
	    item.menu_items.splice(7, 0,
				   {title: "Add Album to Playlist",
				    visible: function() {
					return data.key.indexOf('a') == 0;
				    },
				    action: function() {
					var copy = jQuery.extend(true, {}, data);
					copy.key = data.trackKeys;
					R.Playlists.showAddToPlaylistDialog(copy);
					return false;
				    }});
	}
	return result;
    }
    R.Api.origRequest = R.Api.request;
    R.Api.request = function() {
	console.log(arguments);
	var args = arguments[0];
	if (args.method == 'addToPlaylist') {
	    var tracks = args.content.tracks;
	    if (tracks.length == 1 && tracks[0] instanceof Array) {
		console.log("hey I'm an album", tracks[0]);
		R.Api.request({method: "addToPlaylist", 
			       content: { playlist: args.content.playlist, 
					  tracks: tracks[0] }, 
			       success: function(arg) { 
				   console.log("success", arg); 
			       }});
		return;
	    }
	}
	return R.Api.origRequest.apply(this, arguments);
    }
}

var script = document.createElement("script");
script.type = "text/javascript";
script.text = codeToString(injectedJs);
document.body.appendChild(script);
