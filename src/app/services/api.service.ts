import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CookieService } from '../services/cookie.service';

const api_url = 'http://198.11.172.117/sbm-dashboard';

const controller = 'is';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  // Admin APIs
  login(data: FormData) {
    return this.http.post(`${api_url}/auth/is_login`, data)
      .pipe(map(res => {
        //login successful if the status is success
        if (res['status'] == 'success') {
          this.cookieService.setCookie('currentUser', JSON.stringify(res['res']), 1);
        }
        return res;
      }));
  }

  // Inventory APIs
  getPsItem(data: FormData) {
    return this.http.post(`${api_url}/${controller}/get_ps_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  getIsItem(data: FormData) {
    return this.http.post(`${api_url}/${controller}/get_is_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  addIsItem(data: FormData){
    return this.http.post(`${api_url}/${controller}/add_is_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  removeIsItem(data: FormData){
    return this.http.post(`${api_url}/${controller}/remove_is_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  getIsCounts(data: FormData){
    return this.http.post(`${api_url}/${controller}/get_is_counts`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  addIsCount(data: FormData){
    return this.http.post(`${api_url}/${controller}/add_is_count`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  removeIsCount(data: FormData){
    return this.http.post(`${api_url}/${controller}/remove_is_count`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  draftIsCount(data: FormData){
    return this.http.post(`${api_url}/${controller}/draft_is_count`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  getCItems(data: FormData){
    return this.http.post(`${api_url}/${controller}/get_c_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  getDraftItems(data: FormData){
    return this.http.post(`${api_url}/${controller}/get_draft_items`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  addCountDetail(data: FormData){
    return this.http.post(`${api_url}/${controller}/add_count_detail`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  addCountDetailBatch(data: FormData){
    return this.http.post(`${api_url}/${controller}/add_count_detail_batch`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  canStartCount(data: FormData){
    return this.http.post(`${api_url}/${controller}/can_start_count`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  completeCount(data: FormData){
    return this.http.post(`${api_url}/${controller}/complete_count`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  orderStatusUpdate(data: FormData){
    return this.http.post(`${api_url}/${controller}/order_status_update`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  isDraft(data: FormData){
    return this.http.post(`${api_url}/${controller}/is_draft`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  removeDraftDetailItem(data: FormData){
    return this.http.post(`${api_url}/${controller}/remove_draft_detail_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  sendDataToDashboard(data: FormData){
    return this.http.post(`${api_url}/${controller}/send_data_to_dashboard`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  //

  getItem(data: FormData) {
    return this.http.post(`${api_url}/${controller}/get_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  getItemById(data: FormData) {
    return this.http.post(`${api_url}/${controller}/get_item_by_id`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  addItem(data: FormData) {
    return this.http.post(`${api_url}/${controller}/add_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  updateItem(data: FormData) {
    return this.http.post(`${api_url}/${controller}/update_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  updateItemStatus(data: FormData) {
    return this.http.post(`${api_url}/${controller}/update_item_status`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  removeItem(data: FormData) {
    return this.http.post(`${api_url}/${controller}/remove_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  addBatchItem(data: FormData) {
    return this.http.post(`${api_url}/${controller}/add_batch_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  addOrder(data: FormData){
    return this.http.post(`${api_url}/purchasing/create_auto_order`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  getOrders(data: FormData){
    return this.http.post(`${api_url}/${controller}/get_orders`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  getAllOrders(data: FormData){
    return this.http.post(`${api_url}/${controller}/get_all_orders`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  getOrderDetails(data: FormData){
    return this.http.post(`${api_url}/${controller}/get_order_details`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  getPsUsers(){
    return this.http.post(`${api_url}/${controller}/get_ps_users`, '')
      .pipe(map(res => {
        return res;
      }))
  }
  getPsAdmin(data: FormData){
    return this.http.post(`${api_url}/${controller}/get_ps_admin`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  updateOrderStatus(data: FormData){
    return this.http.post(`${api_url}/${controller}/update_order_status`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  deleteOrder(data: FormData){
    return this.http.post(`${api_url}/${controller}/delete_order`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  deleteOrderedItem(data: FormData){
    return this.http.post(`${api_url}/${controller}/delete_ordered_item`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  updateOrder(data: FormData){
    return this.http.post(`${api_url}/${controller}/update_order`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  addAdditionalItemsToOrder(data: FormData){
    return this.http.post(`${api_url}/${controller}/add_additional_items_to_order`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  sendMail(data: FormData){
    return this.http.post(`${api_url}/${controller}/send_mail_to_user`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  sendMailToAdmin(data: FormData){
    return this.http.post(`${api_url}/${controller}/send_mail_to_admin`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  sendStatusUpdateMail(data: FormData){
    return this.http.post(`${api_url}/${controller}/send_status_update_mail`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  purchasingSystemGetOrderHistory(data: FormData) {
    return this.http.post(`${api_url}/purchasing/get_order_history_inventory`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  purchasingSystemGetOrderDetails(data: FormData) {
    return this.http.post(`${api_url}/purchasing/get_order_details`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  purchasingSystemAcceptItem(data: FormData) {
    return this.http.post(`${api_url}/purchasing/accept_item_inventory`, data)
      .pipe(map(res => {
        return res;
      }))
  }
  purchasingSystemGetLastPoNumber(data: FormData) {
    return this.http.post(`${api_url}/purchasing/get_last_po_number`, data)
      .pipe(map(res => {
        return res;
      }))
  }
}
