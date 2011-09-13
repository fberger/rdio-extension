function toCode(f) {
    return "(" + f.toString() + ")();";
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
script.text = toCode(injectedJs);
document.body.appendChild(script);
