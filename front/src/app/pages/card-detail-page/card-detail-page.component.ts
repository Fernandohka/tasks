import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-detail-page',
  imports: [CommonModule, MatCardModule],
  templateUrl: './card-detail-page.component.html',
  styleUrl: './card-detail-page.component.css'
})
export class CardDetailPageComponent implements OnInit {
  task: Observable<Task> | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: TasksService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if(!id)
        return;

      this.task = this.service.getById(id);
    })
  }

}
