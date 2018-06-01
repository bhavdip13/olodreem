import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaService } from '../../services/media.service'
import { DefaultDataModel } from '../../models/defaultdatamodel';
import { ToastyService } from 'ng2-toasty';
import { Mmedia } from '../../models/index';
import { debug } from 'util';

declare var $: any;

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',

  encapsulation: ViewEncapsulation.None
})
export class MediaComponent {
  public userList: UserData[];
  DefaultDataList: DefaultDataModel[];
  public tableWidget: any;

  index: number;
  //  user: User;

  //constructor() {
  //}

  ngOnInit() {
  }

  constructor(public http: Http,
    private _router: Router,
    private _userService: MediaService,
    private toastyService: ToastyService) {
    this.getUsers();

  }
  
  getUsers() {

    this._userService.getUsers()
      .subscribe(data => {
        this.userList = data;
        this.DefaultDatatableDemo(data);
        console.log("DATA2", this.userList);

      })
  }

  DefaultDatatableDemo(data): void {

    var options = {
      data: {
        type: 'local',
        source: data,
        pageSize: 10
      },
      layout: {
        theme: 'default',
        class: '',
        scroll: true,
        height: 350,
        footer: false
      },

      sortable: true,

      filterable: false,

      pagination: true,

      search: {
        input: $('#generalSearch')
      },

      // toolbar
      toolbar: {
        // toolbar items
        items: {
          // pagination
          pagination: {
            pageSizeSelect: [5, 10, 20, 30, 50, 100/*, -1*/] // display dropdown to select pagination size. -1 is used for "ALl" option
          }
        }
      },

      columns: [
                {
          field: 'id',
          title: '',
          width: 1,
          display: "none"
        },
        {
          field: 'filename',
          title: '',
          width: 1,
          display: "none"
        },
        {
          field: "artist",
          title: "Artist",
          width: 100,
          responsive: { visible: 'lg' }
        },
        {
          field: "title",
          title: "Title",
          width: 95,
          responsive: { visible: 'lg' }
        },

        {
          field: "type",
          title: "Type",
          width: 75
        },

        {
          field: "size",
          title: "Size",
          width: 50,
          responsive: { visible: 'lg' }
        },
        {
          field: "category",
          title: "Category",
          width: 100,
          responsive: { visible: 'lg' }
        }
        , {
          field: "Actions",
          width: 190,
          title: "Actions",
          sortable: false,
          overflow: 'visible',
          template: function (row, index, datatable) {

            return '\<div style="cursor:pointer;" (click)="playsong()" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Play">\
							<i class="la la-play"></i>\
						</div>\
						<div style="cursor:pointer;"  id="m_datatable_edit_get" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Edit" id="m_datatable_edit_get">\
							<i class="la la-edit"></i>\
						</div>\
            <div style="cursor:pointer;" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="QR Code">\
							<i class="la la-qrcode"></i>\
						</div>\
            <div style="cursor:pointer;" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Statistic">\
							<i class="la la-bar-chart"></i>\
						</div>\
             <div style="cursor:pointer;"  id="m_datatable_delete_get" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Delete">\
							<i class="la la-close"></i>\
						</div>\
            ';
          }
        }
      ]
    };

    $('.m_datatable').mDatatable('destroy');
    var datatable = $('.m_datatable').mDatatable(options);

    //get checked record and get value by column name
    $('#m_datatable_edit_get').on('click', () => {

      // select active rows
      // datatable.rows('.m-datatable__row--active');

      // check selected nodes
      //if (datatable.nodes().length > 0) {
      // get column by field name and get the column nodes

      var value = datatable.columns('id').nodes().text();
      this.index = value;
      this._router.navigate(['/media/addmedia', value]);
      //$('#datatable_value').html(value);
      //}
    });

    $('#m_datatable_delete_get').on('click', () => {

      // select active rows
     // datatable.rows('.m-datatable__row--active');

      // check selected nodes
     // if (datatable.nodes().length > 0) {
        // get column by field name and get the column nodes
        var value = datatable.columns('id').nodes().text();
        this.index = value;
        this.OnDeleteById(value)

      //}
    });
    $('#playsong').on('click', () => {
      // select active rows
     // datatable.rows('.m-datatable__row--active');
      
      // check selected nodes
     // if (datatable.nodes().length > 0) {
        // get column by field name and get the column nodes
      debugger;
        var value = datatable.columns('filename').nodes().text();
        let audio = new Audio();
        audio.src = value;
        audio.load();
        audio.play();
     // }
    });

  }

  public OnDeleteById(index: number) {
    this._userService.deleteUser(index)
      .subscribe(responce => {
        this.getUsers();
      }, error => console.log(error))
  }
}
interface UserData {
  artist: string;
  title: string;
  size: string;
  category: string;
  type: string;
}
