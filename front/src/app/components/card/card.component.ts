import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()
  title: string = 'titleTeste'
  @Input()
  description: string = 'descriptionTeste'
}
