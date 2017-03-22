import { Component } from '@angular/core';

@Component({
	selector: 'my-words',
	template: `
	<div class="mywords">
		<h2>Words</h2>
		<h3>🚦Construction Mode🚦</h3>
	</div>
	`,
	styles: [ `
	.mywords {
		height: 100%;
		width: 100%;
		background: green;
	}` ],
})
export class WordsComponent {

}