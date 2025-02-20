import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { TasksService } from '../../services/tasks.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';

@Component({
  selector: 'app-card-page',
  imports: [CardComponent, CommonModule],
  templateUrl: './card-page.component.html',
  styleUrl: './card-page.component.css'
})
export class CardPageComponent implements OnInit{
  constructor(
    private service: TasksService
  ) {}

  tasks: Observable<Task[]> | undefined;
  ngOnInit(): void {
    this.tasks = this.service.get()
  }
}
