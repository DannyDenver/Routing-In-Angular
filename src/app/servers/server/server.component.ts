import { Router, Params, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  id = 0;

  constructor(private serversService: ServersService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {

    //using route params
  //   this.id = +this.route.params['id'];  //treat as number put plus
  //   this.server = this.serversService.getServer(this.id);
  //   this.route.params
  //     .subscribe((params: Params) => 
  //     this.server = this.serversService.getServer(+params['id']));         
  // }

  ///using resolver
  this.route.data.subscribe((data: Data) => {
    this.server = data['server'] // name has to match resolver name in app-routing.module
    })
  }
    onEdit(){
          //this.router.navigate(['/servers', this.id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
          this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve' }) /// keep original query params sent too this component
        }
}
