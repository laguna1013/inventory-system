import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ParseService } from '../../services/parse.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import { GlobalService } from '../../services/global.service'

@Component({
  selector: 'app-order-receive',
  templateUrl: './order-receive.component.html',
  styleUrls: ['./order-receive.component.css']
})
export class OrderReceiveComponent implements OnInit {

  constructor(
    public globalService: GlobalService,
    private api: ApiService,
    private parseService: ParseService,
    private toast: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.globalService.menu = 'order-receive';
  }

}