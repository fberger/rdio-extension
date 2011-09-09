function toCode(f) {
    return "(" + f.toString() + ")();";
}

function g() {
    jQuery.fn.g = jQuery.fn.suspenders;
    jQuery.fn.suspenders = function(f) {
	console.log(f);
	if (f.menu_items != undefined) {
	    f.menu_items.push(f.menu_items[2]);
	}
	var result = jQuery.fn.g.call(this, f);
	console.log("result", result);
	return result;
    };
    jQuery.fn.suspenders.defaults = jQuery.fn.g.defaults;
}

console.log("code", toCode(f));

var script = document.createElement("script");
script.type = "text/javascript";
script.text = toCode(g);
document.body.appendChild(script);
