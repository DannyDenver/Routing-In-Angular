import { Observable } from 'rxjs/Observable';
import { CanComponentDeativate } from './can-deactivate-guard.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeativate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  id: number;
  allowEdit = false;
  changesSaved = false; 

  constructor(private serversService: ServersService, 
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
    this.id = +this.route.params['id'],

    this.route.queryParams.subscribe(
        (queryParams: Params) =>
        { this.allowEdit = queryParams['allowEdit'] === '1' ? true : false; }
    );

    this.route.fragment.subscribe();
    this.id = +this.route.snapshot.params['id'];
    
    this.route.params
    .subscribe(
      (params: Params) => { 
        this.id = +params['id'];
       }
    )

    //subscribe route params to update the id if params change
    this.server = this.serversService.getServer(this.id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  canDeactivate():  Observable<boolean> | Promise<boolean> | boolean{
    if(!this.allowEdit){
      return true;
    }
    if ((this.serverName != this.server.name || this.serverStatus != this.server.status) && !this.changesSaved){
      return confirm("Do you want to discard the changes?"); 
    }else { 
      return true;
    }
  }
}
