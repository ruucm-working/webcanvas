import '../imports/api/canvas-contents.js';
import '../imports/api/project-contents.js';
import '../imports/api/word-contents.js';
import '../imports/api/users-database.js';
import { Meteor } from 'meteor/meteor';
import { WordContents } from '../imports/api/word-contents.js';

Meteor.publish('wordcontents', function() {
	return WordContents.find(); 
});
