import { Injectable } from '@angular/core';
import myGlobals = require('../globals');

@Injectable()
export class CanvasTitleService {
	constructor(
	) { }
	canvas_title_anim_init() {
		myGlobals.title_timeline = new mojs.Timeline();
		class TitleAnim extends mojs.CustomShape {
		  getShape () { return '<path id="XMLID_142_" fill="#F2F2F2" d="M12.2,18.2c-0.6-1.5-0.9-3.2-0.9-4.9C11.2,6,16.9,0,23.9,0c7,0,12.7,6,12.7,13.3 c0,3.8-1.5,7.2-3.9,9.6c1.8-0.3,3.6-0.5,5.5-0.5c6.9,0,13,2.1,17.1,5.4H32.1h-11H0C2.6,23,7,19.5,12.2,18.2z"/>'; }
		  getLength () { return 100; }
		}
		mojs.addShape( 'titleanim', TitleAnim );
		myGlobals.canvas_title_anim = new mojs.Shape({
			shape: 'titleanim',
			fill: 'none',
			radius:   75,
			y: 20,
			duration: 1600,
			opacity: { 1: 0 },
			repeat: 999,
			origin: '0 50%',
			easing: 'cubic.out',
			delay:  675,
			stroke: 'blue',
			strokeWidth: 4,
			strokeLinecap: 'round',
			strokeDasharray:  '100',
			strokeDashoffset: { '100': 0 }
		});
		myGlobals.title_timeline.add( myGlobals.canvas_title_anim );
		$( document ).ready(function() {
			
		});
	}
}
