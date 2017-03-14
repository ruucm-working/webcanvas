import { Mongo } from 'meteor/mongo';
// import { MongoObservable } from 'meteor-rxjs';

// export interface CanvasContent {
// 	_id?: string;
// 	title?: string;
// 	picture?: string;
// 	lastMessage?: Message;
// }
// export const CanvasContents = new MongoObservable.Collection<CanvasContent>('canvascontents');

export const CanvasContents = new Mongo.Collection('canvascontents');
