import { Component } from '@angular/core';

@Component({
	selector: 'my-words',
	template: `
	<div class="mywords">
		<h2>Hello Words!</h2>
	</div>
	`,
	styles: [ `
	.mywords {
		height: 100%;
		position: absolute;
		width: 100%;
		background: green;
	}` ],
})
export class WordsComponent {

}