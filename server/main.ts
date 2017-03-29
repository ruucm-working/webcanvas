import { CanvasContents } from '../imports/api/canvas-contents.js';
import '../imports/api/project-contents.js';
import { WordContents } from '../imports/api/word-contents.js';
import '../imports/api/users-database.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('wordcontents', function() {
	return WordContents.find(); 
});
Meteor.publish('canvascontents', function() {
	return CanvasContents.find(); 
});
