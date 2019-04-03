// #region Global vars / Life-Cycle Functions
/***********************************************************************
***********************************************************************/
const SCOPES = ['global', 'public', 'private', 'protected', 'testMethod', 'webService'];
const APEX_DOC_MENU = 'APEX_DOC_2_MENU';
const APEX_DOC_ACTIVE_EL = 'APEX_DOC_2_ACTIVE_EL';
const APEX_DOC_SCOPE = 'APEX_DOC_2_SCOPE';

// document ready function - removes jQuery dependency
document.addEventListener("DOMContentLoaded", () => {
	initMenu();
	initHighlightJs();
	renderMenuFromState();
	setActiveElement();
	readScope();
	hideAllScopes();
	showScopes();
});

// fire un-mounting functions
window.onbeforeunload = () => {
	updateMenuState();
	updateActiveElement();
}
// #endregion

// #region Initialization & Menu Utils
/***********************************************************************
***********************************************************************/
function initHighlightJs() {
	const selectors = [
		'pre code', '.methodAnnotations', '.classSignature',
		'.classAnnotations', '.propAnnotations'
	];
	// initialize highlighting for code examples and
	// signatures for methods, classes, props and enums
	selectors.forEach(selector => {
		document.querySelectorAll(selector).forEach(block => {
			hljs.highlightBlock(block);
		});
	});
}

// create session storage object for menu state
// and/or update state with any new menu items
function initMenu() {
	const hasState = sessionStorage.getItem(APEX_DOC_MENU);
	let items = document.querySelectorAll('.groupName');
	let state = !hasState ? {} : JSON.parse(hasState);

	if (!hasState) {
		// initialize menu state
		console.log('ApexDoc2: initializing menu state');
		items.forEach(item => state[item.id] = false);
	} else {
		// If already init, add any new class groups since last load.
		// should really only happen when docs are under development
		updateMenuModel(items, state);
	}

	// finally, update sessionStorage with latest state
	sessionStorage.setItem(APEX_DOC_MENU, JSON.stringify(state));
}

function updateMenuModel(items, state) {
	// 1) get keys currently in state object
	let keys = Object.keys(state);

	// 2) get ids from each .groupName <details> element
	let groups = Array.prototype.map.call(items, item => ({
		id: item.id,
		isOpen: item.getAttribute('open')
	}));

	// 3) perform diff to get Ids not yet captured in storage
	let deletedKeys = keys.filter(key =>
		groups.findIndex(group => group.id === key) === -1);

	let newKeys = groups.filter(item => keys.indexOf(item.id) === -1);

	// 4) add/delete keys to/from state
	if (deletedKeys.length > 0) {
		deletedKeys.forEach(key => {
			delete state[key];
		});
		console.log('ApexDoc2: Stale menu keys found, deleting from session storage:');
		console.log(deletedKeys);
	}

	if (newKeys.length > 0) {
		newKeys.forEach(item => state[item.id] = item.isOpen === '' && true);
		console.log('ApexDoc2: New menu keys found, adding to session storage:');
		console.log(newKeys.map(function(g) { return g.id }));
	}
}

function renderMenuFromState() {
	let state = JSON.parse(sessionStorage.getItem(APEX_DOC_MENU));
	for (let group in state) {
		let item = document.getElementById(group);
		if (state[group]) {
			console.log('ApexDoc2: Opening ' + group + ' section');
			item.setAttribute('open', '');
		}
	}
}

// save menu state before each unload so that state is
// preserved when changing files or when reloading the page.
function updateMenuState() {
	let items = document.querySelectorAll('.groupName');
	let state = JSON.parse(sessionStorage.getItem(APEX_DOC_MENU));

	items.forEach(item => {
		let isOpen = item.getAttribute('open');
		state[item.id] = isOpen === '' && true;
	});

	sessionStorage.setItem(APEX_DOC_MENU, JSON.stringify(state));
}

// preserve active menu item across loads
function updateActiveElement() {
	let active = document.querySelector('.active');
	active && sessionStorage.setItem(APEX_DOC_ACTIVE_EL, active.id);
}

// set active element from storage
function setActiveElement() {
	const id = sessionStorage.getItem(APEX_DOC_ACTIVE_EL);
	if (id) {
		var item = document.getElementById(id);
		item.classList.add('active');
		// focus element as well so tab
		// navigation can pick up where it left off
		if (item.firstElementChild && item.firstElementChild.tagName === 'A') {
			item.firstElementChild.focus();
		} else {
			item.focus();
		}
	}
}
// #endregion


// #region Scope Utils
/***********************************************************************
***********************************************************************/
function getListScope() {
	let list = [];
	let checkboxes = document.querySelectorAll('input[type=checkbox]');
	checkboxes.forEach(checkbox => {
		if (checkbox.checked && checkbox.id !== 'cbx-all') {
			let str = checkbox.id;
			str = str.replace('cbx-', '');
			list.push(str);
		}
	});
	return list;
}

function showScopes() {
	let list = getListScope();
	for (let i = 0; i < list.length; i++) {
		toggleScope(list[i], true);
	}
}

function showAllScopes() {
	for (let i = 0; i < SCOPES.length; i++) {
		toggleScope(SCOPES[i], true);
	}
}

function hideAllScopes() {
	for (let i = 0; i < SCOPES.length; i++) {
		toggleScope(SCOPES[i], false);
	}
}

function setScope() {
	const list = getListScope();
	const scopes = list.join(',');
	sessionStorage.setItem(APEX_DOC_SCOPE, scopes);
	shouldCheckAll(list);
}

function readScope() {
	const strScope = getScope();
	if (strScope != null && strScope != '') {

		// first clear all the scope checkboxes
		let checkboxes = document.querySelectorAll('input[type=checkbox]');
		checkboxes.forEach(checkbox => checkbox.removeAttribute('checked'));

		// now check the appropriate scope checkboxes
		let list = strScope.split(',');
		for (let i = 0; i < list.length; i++) {
			let id = 'cbx-' + list[i];
			let checkbox = document.getElementById(id);
			checkbox.setAttribute('checked', true);
		}

		// check the all box if all scopes have are active
		shouldCheckAll(list);
	} else {
		showAllScopes();
	}
}

function getScope() {
	const scope = sessionStorage.getItem(APEX_DOC_SCOPE);
	return scope ? scope : '';
}

function shouldCheckAll(list) {
	const checkboxes = document.querySelectorAll('input[type=checkbox]');

	let allBox = document.getElementById('cbx-all');

	if (checkboxes.length - 1 === list.length) {
		allBox.setAttribute('checked', true);
	} else {
		allBox.removeAttribute('checked');
	}
}

function toggleAllScopes(isShow) {
	const checkboxes = document.querySelectorAll('input[type=checkbox]');
	// NOTE: for some reason, just checking or un-checking the checkboxes
	// via attribute and then using hideAllScopes or showAllScopes wasn't
	// working as expected, use click() to trigger the onclick funcs instead.
	checkboxes.forEach(checkbox => {
		if (checkbox.id !== 'cbx-all') {
			if (isShow && !checkbox.checked) {
				checkbox.click();
			} else if (!isShow && checkbox.checked) {
				checkbox.click();
			}
		}
	});
}

function toggleScope(scope, isShow) {
	setScope();

	let enumTable = document.querySelectorAll('.properties');
	let propTable = document.querySelectorAll('.enums');
	let methodsH2 = document.querySelectorAll('.methods');

	let props = document.querySelectorAll('.property.' + scope);
	let enums = document.querySelectorAll('.enum.' + scope);
	let methods = document.querySelectorAll('.method.' + scope);
	let classes = document.querySelectorAll('.class.' + scope);

	// show or hide all props, classes, & methods of a given scope
	if (isShow === true) {
		// show tables if they've been hidden and rows to show
		props.length && toggleVisibility(enumTable, true);
		enums.length && toggleVisibility(propTable, true);
		methods.length && toggleVisibility(methodsH2, true);

		toggleVisibility(props, true);
		toggleVisibility(enums, true);
		toggleVisibility(methods, true);
		toggleVisibility(classes, true);
	}

	else {
		toggleVisibility(props, false);
		toggleVisibility(enums, false);
		toggleVisibility(methods, false);
		toggleVisibility(classes, false);

		// hide props tables if all rows have been hidden
		maybeHideElement('.properties', '.property');
		maybeHideElement('.methods', '.method');
		maybeHideElement('.enums', '.enum');
	}
}

function toggleVisibility(elements, isShow) {
	for (let elem of elements) {
		if (isShow) {
			elem.classList.remove('hide');
		} else {
			elem.classList.add('hide');
		}
	}
}

function maybeHideElement(toHide, itemSelector) {
	let props, table = document.querySelectorAll(toHide);
	if (props = document.querySelectorAll(itemSelector)) {
		for (let prop of props) {
			if (!prop.classList.contains('hide')) {
				return;
			}
		}
		toggleVisibility(table, false);
	}
}
// #endregion


// #region Navigation utils
/***********************************************************************
***********************************************************************/
function toggleActiveClass(elem) {
	// remove isActive from current active element
	let item = document.querySelector('.active');
	item && item.classList.remove('active');

	// add to new active element
	elem.classList.add('active');
}

function goToLocation(url) {
	// prevent collapsing / expanding menu when clicking on Class Group link
	event.preventDefault();
	toggleActiveClass(event.currentTarget);
	if (document.location.href.toLowerCase().indexOf(url.toLowerCase()) === -1) {
		document.location.href = url;
	}
}
// #endregion