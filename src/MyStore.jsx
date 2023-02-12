function MyWritableStore(value) {
	
	let subscribeFunctions = [];
	
	function set(newValue) {
		value = newValue;
		subscribeFunctions.forEach((func) => func(newValue))
	}
	
	function update(callback) {
		set(callback(value));
	}
	
	function subscribe(callback) {
		subscribeFunctions.push(callback);
		callback(value)
		
		return function() {
			subscribeFunctions = 
			subscribeFunctions.filter((func) => callback !== func)
		}
	}
	
	return {set, update, subscribe};
}

const PageCurrentlyStore = MyWritableStore(0);

export {
	PageCurrentlyStore,
}