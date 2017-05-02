import { CanvasContents } from '../imports/api/canvas-contents.js';
import '../imports/api/project-contents.js';
import { WordContents } from '../imports/api/word-contents.js';
import { UsersDatabase } from '../imports/api/users-database.js';
import { MyFiles } from '../imports/api/my-files.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('wordcontents', function() {
	return WordContents.find(); 
});
Meteor.publish('usersdatabase', function() {
	return UsersDatabase.find(); 
});
Meteor.publish('canvascontents', function() {
	return CanvasContents.find(); 
});

// Only publish files owned by this userId, and ignore
// file chunks being used by Resumable.js for current uploads
Meteor.publish('myData',
function () {
	return MyFiles.find({ 'metadata._Resumable': { $exists: false },
						'metadata.owner': this.userId });
}
);

// Allow rules for security. Should look familiar!
// Without these, no file writes would be allowed
MyFiles.allow({
// The creator of a file owns it. UserId may be null.
insert: function (userId, file) {
	// Assign the proper owner when a file is created
	file.metadata = file.metadata || {};
	file.metadata.owner = userId;
	return true;
},
// Only owners can remove a file
remove: function (userId, file) {
	// Only owners can delete
	return (userId === file.metadata.owner);
},
// Only owners can retrieve a file via HTTP GET
read: function (userId, file) {
	return (userId === file.metadata.owner);
},
// This rule secures the HTTP REST interfaces' PUT/POST
// Necessary to support Resumable.js
write: function (userId, file, fields) {
	// Only owners can upload file data
	return (userId === file.metadata.owner);
}
});
