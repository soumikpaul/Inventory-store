import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService} from '../item.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ItemService) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.id)
    .subscribe((data)=>{
      console.log(data);
      console.log("deleted");
    })
  } 
}
