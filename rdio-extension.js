var debug = false;
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
    jQuery.fn.autoSuspenders = function(j, v) {
	var result = jQuery.fn.origAutoSuspenders.call(this, j, v);
	v.menu_items.push({title: "Own menu item",
			   visible: function() {
			       return true;
                           },
			   action: function() {
			       R.Playlists.showAddToPlaylistDialog(j);
			       return false;
			   }});
	return result;
    }
}

var script = document.createElement("script");
script.type = "text/javascript";
script.text = codeToString(injectedJs);
document.body.appendChild(script);
