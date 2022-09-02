import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Job} from "../../../_models/job.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {JobServiceService} from "../../../_services/job-service.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DetailsComponent} from "../details/details.component";
import {Router} from "@angular/router";
import {UsersService} from "../../../_services/users.service";

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

  isSmall: boolean = false

  constructor(private jobService: JobServiceService,
              private dialog: MatDialog,
              private snack: MatSnackBar,
              private router: Router,
              private us: UsersService) {
         this.getJobs()
  }

  getJobs() {
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
    this.us.isSmall.subscribe(
      res=> this.isSmall = res
    )

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setupFilter(column: string) {
    this.dataSource.filterPredicate = (d:  any, filter: string) => {
      const textToSearch = d[column] && d[column].toLowerCase() || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  editItem(job: Job) {
    if(!this.isSmall) {
      this.router.navigate([],
        {
          queryParams: {
            modify: 'modify',
            title: job.title,
            company: job.company,
            description: job.description,
            address: job.address,
            salary:job.salary,
            type: job.type,
            uid:job.uid
          },
        })
    }
    else {
      this.router.navigate(['recruiter/job-edit'],
        {
        queryParams: {
          modify: 'modify',
            title: job.title,
            company: job.company,
            description: job.description,
            address: job.address,
            salary:job.salary,
            type: job.type,
            uid:job.uid
        },
        })

    }


  }


  detailsItem(job: Job) {
    this.dialog.open(DetailsComponent,
      {
        width: '400px',
        data: {
          job: job
        },
      });
  }

  deleteItem(job: Job) {
    const dialogRef = this.dialog.open(DeleteDialogComponent,
      {
        width: '250px',
        data: {
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
      panelClass: ['blue-snackbar', 'login-snackbar']
    });
    this.getJobs()
  }
}
