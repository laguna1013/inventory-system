import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ParseService } from '../../../services/parse.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import { GlobalService } from '../../../services/global.service'
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  constructor(
    public globalService: GlobalService,
    private api: ApiService,
    private parseService: ParseService,
    private toast: ToastrService,
    private authService: AuthService,
    private loadingBar: LoadingBarService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  loader = this.loadingBar.useRef()

  is_items: Array<Object> = []
  ps_items: Array<Object> = []
  c_items: Array<Object> = []
  is_search_key: string = ''

  draft_id = -1
  draft_items: Array<Object> = []

  is_draft = false;

  ngOnInit(): void {
    this.globalService.menu = 'count'
    this.draft_id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.isDraft(this.draft_id)
    this.getItems()
  }
  isDraft(id){
    this.loader.start()
    this.api.isDraft(
      this.parseService.encode({
        id: id 
      })
    ).pipe(first()).subscribe(data => {
      if(data['data'][0].status == 'completed'){
        this.is_draft = false
      }else{
        this.is_draft = true
      }
      this.loader.complete()
    }, error => {
      console.log(error)
      this.loader.complete()
    })
  }
  getItems(){
    this.loader.start()
    this.api.getCItems(
      this.parseService.encode({
        branch_id: this.authService.currentUser()['branch_id']
      })
    ).pipe(first()).subscribe(
      data => {
        if (data['status'] == 'success') {
          this.is_items = [...data['data']]
          this.api.getDraftItems(
            this.parseService.encode({
              draft_id: this.draft_id
            })
          ).pipe(first()).subscribe(
            data => {
              this.draft_items = [...data['data']]
              this.adjust_items()
            }, error => {
              console.log(error)
              this.loader.complete()
            }
          )
        } else {
          this.toast.error('Item fetching error. There is an issue with server. Please try again.', 'Error');
          this.loader.complete()
        }
      },
      error => {
        console.log(error)
        this.loader.complete()
      }
    );
  }
  adjust_items(){
    let draft_item_ids = []
    this.draft_items.map(item => {
      draft_item_ids.push(item['inventory_id'])
    })
    this.is_items.map(item => {
      if(draft_item_ids.indexOf(item['inventory_id']) == -1){
        item['added'] = false
      }else{
        item['added'] = true
      }
    })
    this.loader.complete()
  }
  search_is_item(e){
    this.is_search_key = e.target.value
  }
  add_to_count(item){
    Swal.fire({
      title: 'Add this item to count list?',
      html: `
        <div class="p-5">
          <div class="flex items-center">
            <p class="text-left truncate">${item['description']}</p>
            <p class="ml-auto text-red-400 truncate">${item['vendor_description']}</p>
          </div>
          <div class="flex items-center mt-2">
            <p class="text-left truncate">${item['packing_info']}</p>
            ${item['category'] == 'frozen' ?
             '<span class="px-2 ml-2 rounded-full border border-theme-3 text-theme-3">frozen</span>' :
             '<span class="px-2 ml-2 rounded-full border border-theme-12 text-theme-12">dry</span>'
            }
          </div>
          <div class="flex items-center mt-3">
            <div>Qty: </div>
            <div class="ml-1 sm:ml-5 flex items-center">
              <input 
                placeholder="0" 
                style="width: 40px" 
                id="primary_qty" 
                type="number" 
                min="0" 
                max="999" 
                step="0.01" 
                class="text-sm w-full outline-none border rounded py-2 px-1 text-right"
              />
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add',
      allowOutsideClick: false,
      preConfirm: () => {
        let primary_qty = document.querySelector('#primary_qty')['value']
        if(primary_qty == '' || primary_qty == 0){
          this.toast.error('You need to input primary qty.', 'Error')
          return false
        }
        this.loader.start()
        this.api.addCountDetail(this.parseService.encode({
          is_count_id: this.draft_id,
          is_item_id: item.is_item_id,
          qty_primary: primary_qty,
          qty_secondary: 0
        })).pipe(first()).subscribe(data => {
          if (data['data'] == true) {
            this.toast.success('Item counted successfully.', 'Success');
            this.getItems()
          } else {
            this.toast.error('There had been a database error. Please try again later.', 'Error');
          }
          this.loader.complete()
        }, error => {
          this.toast.error('There had been a database error. Please try again later.', 'Error');
          this.loader.complete()
        })
      }
    })
  }
  complete_count(){
    Swal.fire({
      title: `Are you sure to complete this count?`,
      showCancelButton: true,
      confirmButtonText: `Complete`,
      icon: 'question'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.complete()
        this.api.completeCount(this.parseService.encode({
          draft_id: this.draft_id
        })).pipe(first()).subscribe(data => {
          if (data['data'] == true) {
            this.toast.success('Count finished successfully. Orders will be placed automatically.', 'Success');
            this.back()
          } else {
            this.toast.error('There had been a database error. Please try again later.', 'Error');
          }
          this.loader.complete()
        }, error => {
          this.toast.error('There had been a database error. Please try again later.', 'Error');
          this.loader.complete()
        })
      } 
    })
  }
  remove_from_count(item){
    Swal.fire({
      title: `Remove this item from the count list?`,
      showCancelButton: true,
      confirmButtonText: `Remove`,
      icon: 'error'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.start()
        this.api.removeDraftDetailItem(this.parseService.encode({
          id: item.draft_detail_id
        })).pipe(first()).subscribe(data => {
          if (data['data'] == true) {
            this.toast.success('Item removed from count list.', 'Success');
            this.getItems()
          } else {
            this.toast.error('There had been a database error. Please try again later.', 'Error');
          }
          this.loader.complete()
        }, error => {
          this.toast.error('There had been a database error. Please try again later.', 'Error');
          this.loader.complete()
        })
      } 
    })
  }
  back(){
    this.router.navigate(['count'])
  }
}
