import { CanvasContents } from '../imports/api/canvas-contents.js';
import '../imports/api/project-contents.js';
import { WordContents } from '../imports/api/word-contents.js';
import { UsersDatabase } from '../imports/api/users-database.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('wordcontents', function() {
	// Counts.publish(this, 'counter-wordcontents', WordContents.find());
	return WordContents.find(); 
});
Meteor.publish('usersdatabase', function() {
	return UsersDatabase.find(); 
});
Meteor.publish('canvascontents', function() {
	return CanvasContents.find(); 
});
