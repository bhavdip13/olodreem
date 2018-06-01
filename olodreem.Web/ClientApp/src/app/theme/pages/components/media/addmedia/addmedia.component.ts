import { Component, OnInit, ViewEncapsulation, AfterViewInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MediaComponent } from '../media.component';
import { Helpers } from '../../../../../helpers';
import { ScriptLoaderService } from '../../../../../_services/script-loader.service';
import { MediaService } from '../../../services/media.service';
import { Mmedia } from '../../../models/index';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { User } from '../../../../../auth/_models';
import { UserService } from '../../../../../auth/_services';


@Component({
  selector: 'app-addmedia',
  templateUrl: './addmedia.component.html',
  styleUrls: ['./addmedia.component.scss']

})
export class AddmediaComponent implements OnInit, AfterViewInit {

 

  mediaForm: FormGroup;
  title: string = "Create";
  id: number;
  errorMessage: any;
  media: Mmedia;
  currentuserdata:any
  userid:number
  public progress: number;
  public ReturnFilename: string;
  public ReturnArray = [];
  public ReturnFilesize: string;



  constructor(
    private http: HttpClient,
    private _script: ScriptLoaderService,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    private _userService: MediaService,
    private userService: UserService,
    private _fb: FormBuilder) {

    if (this._avRoute.snapshot.params["id"]) {
           this.id = this._avRoute.snapshot.params["id"];
    }
    this.currentuserdata = JSON.parse(localStorage.getItem('currentUser'));
    this.userid = this.currentuserdata.id;
  }
   
    upload(files) {
        if (files.length === 0)
            return;

        const formData = new FormData();

        for (let file of files)
            formData.append(file.name, file);

        const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
            reportProgress: true,
        });
      this.http.request(uploadReq).subscribe(event => {
        
            if (event.type === HttpEventType.UploadProgress)
                this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response)
          this.ReturnArray = event.body.toString().split(",");
        this.ReturnFilename = this.ReturnArray[0];
        this.ReturnFilesize = this.ReturnArray[1];


        });
    
		}
  GetUserByID(userid: number) {
    this._userService.getUserById(userid)
      .subscribe(media => {
        this.media = media;
      });
  }

  getUsers() {
    this._userService.getUsers()
      .subscribe(data => {
       })
  }
  ngOnInit() {

    this.initializeForm();
      if (this.id > 0) {
      
      this.title = "Edit";
      this._userService.getUserById(this.id).subscribe(result => {
        console.log(result);
        this.media = result;

        this.mediaForm.setValue({
          id: this.media.id,
          userid: this.userid,
          artist: this.media.artist,
          title: this.media.title,
          type: this.media.type,
          size: this.media.size,
          category: this.media.category,
          filename: this.media.filename,
        });
      });
    }


  }


  ngAfterViewInit() {
    this._script.loadScripts('addmedia',
      ['assets/demo/default/custom/components/forms/validation/form-controls.js']);

  }
  
 
  save() {


    if (this.title == "Create") {
      this.mediaForm.controls['filename'].setValue(this.ReturnFilename);
      this.mediaForm.controls['size'].setValue(this.ReturnFilesize);
        this.mediaForm.controls['userid'].setValue(this.userid);

      
      this._userService.saveUser(this.mediaForm.value)
        .subscribe((data) => {
          this.mediaForm.reset();
          this._router.navigate(['media/media']);
        }, error => console.log(error))
    }
    else if (this.title == "Edit") {

      this._userService.saveUser(this.mediaForm.value)
        .subscribe((data) => {
          this.mediaForm.reset();
          this._router.navigate(['media/media']);
        }, error => console.log(error))
    }
  }
  cancel() {
    this._router.navigate(['/media']);
  }

  private initializeForm() {
    
    this.mediaForm = this._fb.group({
      id: [0],
      userid:[0],
      artist: ['', [Validators.required]],
      title: ['', [Validators.required]],
      type: [''],
      category: [''],
      size: [''],
      filename:[''],
    });


  }

}

