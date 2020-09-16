import {trigger, transition, query, stagger, animate, style, animation } from '@angular/animations';

export const fadeInAnim = animation([
    query(':enter', style({opacity: 0}), {optional: true}),

    query(':enter', stagger('450ms', [
        animate('1s ease-in', style({opacity: 1}))
    ]), {optional: true})
])