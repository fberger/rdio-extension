function toCode(f) {
    return "(" + f.toString() + ")();";
}

function g() {
    jQuery.fn.origAutoSuspenders = jQuery.fn.autoSuspenders;
    jQuery.fn.autoSuspenders = function(j, v) {
	var result = jQuery.fn.origAutoSuspenders.call(this, j, v);
	v.menu_items.push({title: "Own menu item",
			   visible: function() {
			       return true;
                           },
			   action: function() {
			       R.Playlists.showAddToPlaylistDialog(j);
			   }});
	return result;
    }

    jQuery.fn.origSuspenders = jQuery.fn.suspenders;
    jQuery.fn.suspenders = function(f) {
	var result = jQuery.fn.origSuspenders.call(this, f);
	return result;
    };
    jQuery.fn.suspenders.defaults = jQuery.fn.origSuspenders.defaults;
}

var script = document.createElement("script");
script.type = "text/javascript";
script.text = toCode(g);
document.body.appendChild(script);
