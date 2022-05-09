import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IpfsService } from "../services/ipfs.service";
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedFiles?: FileList;           //files selected by user with file broswer
  msg?: string;                       // holds message associated with upload
  FileInfos: any[] = [];             // list of all files uploaded
  reUploads: string[] = [];        // files in selected files that are already uploaded
  ipfsid: string | null = null;    //ID of ipfs node
  //metadata form
  showform: boolean = false;         // display metadata form
  showcontracts: boolean = false;   // display contracts form
  ipfscontracts: boolean = false;

  //use these vars if user selects set all forms same option
  metaname?: string;
  metades?: string;
  creator?: string;
  value?: string;
  date?: any;
  royal?: boolean;

  sameVars: boolean = false;
  contractselection?: string;
  mintingready: boolean = false;

  constructor(private IPFSService: IpfsService) { }

  ngOnInit(): void {
    this.start();
  }

  async start() {
    const id = await this.IPFSService.getId();
    this.ipfsid = id.id;
    if(this.ipfsid == null){
      console.log("IPFS start up FAILED");
    }
    const stat = await this.IPFSService.getStatus();
    console.log(stat);

  /*  To check if node is connected to peers (sharing files)
    const peerInfos = await this.IPFSService.getPeers();
    const peers = await this.IPFSService.getPeers();
    console.log(peers);

    peerInfos.forEach(info => {
      console.log(info.id)
      info.addrs.forEach(addr => console.log(addr.toString()))
    })*/
  }

  //on click of choose files button
  onChange(event: any) {
    this.selectedFiles = event.target.files;
  }
  //on click of upload button
  onClick() {
    this.msg = "";
    this.reUploads = [];
    if(this.selectedFiles && this.selectedFiles[0]) { //if user has selected a file
      const numOfFiles = this.selectedFiles.length;  //gets length of selected files list

      for (let i = 0; i < numOfFiles; i++) { //for files selected
        let name = this.selectedFiles[i].name;
        let file = this.selectedFiles[i];
        let match = false;
        for (var t in this.FileInfos) {  //check if file has already been uploaded
            if (this.FileInfos[t].name == name) {
              match = true;
            }
          }

      if(match){
        this.reUploads.push(name);
        continue;  //skip to next iteration
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFiles[i]); //read file content
      reader.onload = (event) => {                //when image is loaded
        var image = reader.result as string;
        if(image){
          let imageInfo = {
            id: i,
            name: name,
            url: image,
            blob: file,
            imghash: null,
            mname: null,
            desc: null,
            creator: null,
            value: null,
            date: null,
            royal: null,
            metaHash: null
          };
          this.FileInfos.push(imageInfo);
          this.msg = "Success";

          //sort alphabetically by name
          const sorted = this.FileInfos.sort((t1, t2) => {
          const name1 = t1.name.toLowerCase();
          const name2 = t2.name.toLowerCase();
          if (name1 > name2) { return 1; }
          if (name1 < name2) { return -1; }
          return 0;
        })
      } else { //FileReader returned no url
          console.log("FAIL: File could not be read");
          this.msg = "Fail";
          }
        }; //end onload event
      } //end for
    } //end if
  } // end onClick()

  //file remove button
  onRemove(imageObj: any) {
    this.msg = "";
    var index = this.FileInfos.indexOf(imageObj);
    this.FileInfos.splice(index,1);
  }
  //ipfs upload function
  async ipfsUpload() {
    this.showform = true;
    this.ipfscontracts = true;
    if(this.FileInfos && this.FileInfos[0]) { //if user has selected a file
      const len = this.FileInfos.length;
      for(let i = 0; i < len; i++){
        this.FileInfos[i].imghash = await this.IPFSService.addFile(this.FileInfos[i].blob);
        console.log("FILE ADDED. \nName: " + this.FileInfos[i].name + "\nHash: " + this.FileInfos[i].imghash);
      }
    }
  }

  //submit metadata form and convert to JSON form
  async submitMeta(files: any[], linked: boolean) {
    if(linked){
      for(let i=0; i<files.length; i++){
        let data = {
          name: this.metaname,
          description: this.metades,
          image: "ipfs://" + files[i].imghash,
          ...(this.creator != null && {creator: this.creator}),
          ...(this.value && {value: this.value}),
          ...(this.date != null && {date: this.date}),
          ...(this.royal != null && {royalities: this.royal})
        }
        let jsonObj = JSON.stringify(data);
        console.log("JSON metadata: ", jsonObj);
        files[i].metaHash = await this.IPFSService.addFile(jsonObj);
      }
    }else {
      for(let i=0; i<files.length; i++){
        let data = {
          name: files[i].mname,
          description: files[i].desc,
          image: "ipfs://" + files[i].imghash,
          ...(this.creator != null && {creator: this.creator}),
          ...(this.value && {value: this.value}),
          ...(this.date != null && {date: this.date}),
          ...(this.royal != null && {royalities: this.royal})
        }
        let jsonObj = JSON.stringify(data);
        console.log("JSON metadata: ", jsonObj);
        files[i].metaHash = await this.IPFSService.addFile(jsonObj);
      }
    } // end else
    //investigate wrapping ipfs files in directory
    this.showcontracts = true;
  }

  //display the contracts selections if user pressed submit on ipfs form
  //or did not use metadata
  showContracts() {
    this.showcontracts = true;
  }

  selectContract() {
    if(this.contractselection){
      this.mintingready = true;
    }
  }

}
