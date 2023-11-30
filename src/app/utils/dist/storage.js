"use strict";
exports.__esModule = true;
exports.localRemove = exports.localSet = exports.localGet = void 0;
function localGet(key) {
    var value = window.localStorage.getItem(key);
    try {
        return JSON.parse(window.localStorage.getItem(key));
    }
    catch (error) {
        return value;
    }
}
exports.localGet = localGet;
function localSet(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}
exports.localSet = localSet;
function localRemove(key) {
    window.localStorage.removeItem(key);
}
exports.localRemove = localRemove;
