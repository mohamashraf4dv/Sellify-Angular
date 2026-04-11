import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cancel',
  imports: [RouterLink],
  templateUrl: './cancel.html',
  styleUrl: './cancel.scss',
})
export class Cancel implements OnDestroy{

  timeInSeconds = signal(3);
  private readonly router = inject(Router);
  private interval: number | undefined;

  timeEffect = effect(()=>{
    this.interval = setInterval(()=>{
    if(this.timeInSeconds() <= 0){
      clearInterval(this.interval);
      this.router.navigate(['/']);
    }

      this.timeInSeconds.update(prev=> prev-1);
    },1000)
  })


    ngOnDestroy(): void {
      clearInterval(this.interval);
  }
}
