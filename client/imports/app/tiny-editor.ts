import {Component, ElementRef, OnInit, Input, Output, EventEmitter,OnChanges} from '@angular/core';
@Component({
	selector: 'tiny-editor',
	template: `<textarea class="tinyMCE" style="height:300px"></textarea>`
})

export class TinyEditor implements OnInit {
	tinymce: any;
    @Input() value: any;
    @Output() valueChange = new EventEmitter();

    elementRef: ElementRef;
    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        var that = this;
        this.tinymce.init(
		{
		  selector: ".tinyMCE",
		  plugins: ["code"],
		  menubar: false,
		  toolbar1: "bold italic underline strikethrough alignleft aligncenter alignright alignjustify styleselect   bullist numlist outdent indent blockquote undo redo removeformat subscript superscript | code",
		  setup: (editor) => {
		  editor.on('change', (e, l) => {
		      that.valueChange.next(editor.getContent());
		  });
		}
	   });
	}
    ngOnChanges(changes){
        if (this.tinymce.activeEditor)
            this.tinymce.activeEditor.setContent(this.value);
    }
}