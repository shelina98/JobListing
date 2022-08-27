import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Job} from "../../_models/job.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {JobServiceService} from "../../_services/job-service.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements AfterViewInit {

  managerID = JSON.stringify(localStorage.getItem('uid'));
  dataSource!: MatTableDataSource<Job>;
  displayedColumns: string[] = ['Title', 'Description',  'Options'];

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  @Input() height1: number | undefined

  constructor(private jobService: JobServiceService,
              private dialog: MatDialog,
              private snack: MatSnackBar) {
    this.jobService.RecruiterJobs().subscribe(
      res => {
        this.covertDate(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  covertDate(res: any) {
    console.log('hyri ktu')
    for (let i = 0; i < res.length; i++) {
      res.creationdate = new Date(res.creationdate).toLocaleDateString()
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // EditContact(client) {
  //   console.log(client, 'client')
  //   this.contactSer.EditContact(client).subscribe(
  //     data => console.log("Success")
  //   )

  // }
  //
  // editItem(clientModel: Client, id: number) {
  //
  //   const ref = this.mod.open(EditUserComponent, { centered: true });
  //   ref.componentInstance.selectedContact = clientModel;
  //   ref.componentInstance.Id = id;
  //
  //   ref.result.then((yes) => {
  //       this.getClients()
  //     },
  //     (cancel) => {
  //       console.log("Cancel Click");
  //
  //     })
  // }

  //
  // detailsItem(clientModel: Client) {
  //
  //   const ref = this.mod.open(DetailsComponent, { centered: true });
  //
  //   ref.componentInstance.selectedContact = clientModel;
  //
  //   ref.result.then((yes) => {
  //       this.getClients();
  //     },
  //     (cancel) => {
  //       console.log("Cancel Click");
  //
  //     })
  // }


  deleteItem(job: Job) {
    const dialogRef = this.dialog.open(DeleteDialogComponent,
      {
        width: '250px',
        data: {
          name: localStorage.getItem("username"),
          title: job.title,
          job: job
        },
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.DeleteJobs(result)
    });
  }


  DeleteJobs(job: string) {
    this.jobService.deleteJob(job);
    this.snack.open('Job deleted successfully', " OK", {
      panelClass: ['red-snackbar']
    });
    this.jobService.RecruiterJobs().subscribe(
      res => {
        this.covertDate(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

  }
}
