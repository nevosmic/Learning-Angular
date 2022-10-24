import { Component, ViewChild } from '@angular/core';
import { TableService } from './table.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  name: string;
  average: string;
  total_time: string;
  email_name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hello-world';
  displayedColumn: string[] = ['name', 'average', 'total_time', 'email_name'];
  // "non-null assertion operator", is a way to tell typescript that you know for sure the value of a property is neither null nor undefined.
  dataSource!: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // child of dataSource
  @ViewChild(MatSort) sort!: MatSort; // child of dataSource

  posts: any; // results comong from the API

  constructor(private service: TableService) {
    // get data coming from the table service into the console
    // getData returns an observable
    this.service.getData().subscribe((data) => {
      console.log(data);
      data = [
        {
          name: 'Michal',
          average: '75 %',
          total_time: '2733',
          email_name: 'nevosmic28',
        },
        {
          name: 'Yael',
          average: '100 %',
          total_time: '3157',
          email_name: 'Jablonka',
        },
      ];
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // remain something after filter
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
