function safeName(s) 
{
	return s.toLowerCase().replace(/[^a-z0-9_]/gi, '');
}

function firstProp(obj) 
{
	var first = true;
	for (prop in obj) {
		if (first) { return(prop) }
		first = false;
	}
}

function findNext(where, now) 
{
	var isNext = false;
	var next = null;
	for (item in where) {
		if (isNext) {
			next = item;
			isNext = false;
		}
		if (item == now) isNext = true;
	}
	if (next == null) next = firstProp(where);
	return next;
}

function findPrevious(where, now) 
{
	var previous = null;
	for (item in where) {
		if (item == now) {
			break;
		} else {
			previous = item;	
		};
	}

	// https://stackoverflow.com/a/21622274
	if (previous == null) previous = Object.keys(where)[Object.keys(where).length-1];;
	return previous;
}
