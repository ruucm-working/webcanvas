import {trigger, state, animate, style, transition} from '@angular/core';

export function routerTransition(direction) {
	if (direction == 'left')
		return slideToLeft();
	else if(direction == 'right')
		return slideToRight();
	else if(direction == 'top')
		return slideToTop();
	else if(direction == 'bottom')
		return slideToBottom();
	return slideToLeft();
}

function slideToRight() {
  return trigger('routerTransition', [
    state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
    state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
    ])
  ]);
}

function slideToLeft() {
  console.log('slideToLeft()');
  return trigger('routerTransition', [
    state('void', style({position:'fixed', width:'100%', height:'100%', background: 'blue'}) ),
    state('*', style({position:'fixed', width:'100%', height:'100%', background: 'red'}) ),
    transition(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);
}

function slideToBottom() {
  return trigger('routerTransition', [
    state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
    state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
    transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
    ])
  ]);
}

function slideToTop() {
  return trigger('routerTransition', [
    state('void', style({position:'fixed', width:'100%', height:'100%', background: 'blue'}) ),
    state('*', style({position:'fixed', width:'100%', height:'100%', background: 'red'}) ),
    transition(':enter', [
      style({transform: 'translateY(100%)', background: 'green'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateY(0%)', background: 'yellow'}),
      animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
    ])
  ]);
}