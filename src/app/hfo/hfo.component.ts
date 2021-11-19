import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-hfo',
  templateUrl: './hfo.component.html',
})
export class HfoComponent implements OnInit {

  students$ = new BehaviorSubject<any[]>([]);
  filteredStudents$ = new BehaviorSubject<any[]>([]);

  sexFilterControl = new FormControl();

  programCategoryFilterControl = new FormControl();
  programStatusFilterControl = new FormControl();
  programControls = new FormGroup({
    ProgramCategory: this.programCategoryFilterControl, // this code will only work if the names here match the JSON
    ProgramStatus: this.programStatusFilterControl // this code will only work if the names here match the JSON
  });

  // add a new chind array object
  courseCategoryFilterControl = new FormControl();
  courseStatusFilterControl = new FormControl();
  courseControls = new FormGroup({
    CourseCategory: this.courseCategoryFilterControl, // this code will only work if the names here match the JSON
    CourseStatus: this.courseStatusFilterControl // this code will only work if the names here match the JSON
  });

  sexOptions = ['M', 'F'];
  programCategoryOptions = ['Engineering', 'HR', "Finance"];
  programStatusOptions = ['Full Time', 'Part Time']

  // add new array object options
  courseCategoryOptions = ['Engineering', 'HR', "Finance"];
  courseStatusOptions = ['Full Time', 'Part Time']

  constructor() { }

  ngOnInit() {
    /// get all students
    this.students$.next(this.getStudents());
    this.setFilters();
  }

  private setFilters() {
    this.filteredStudents$.next(this.students$.value);
    
    combineLatest(
      this.students$,
      this.sexFilterControl.valueChanges,
      this.programControls.valueChanges,
      this.courseControls.valueChanges
    )
    .subscribe(([students, sexFilter, programFilters, courseFilters]) => {
      let filteredStudents = [ ... students ];

      if (sexFilter) {
        filteredStudents = filteredStudents.filter(student => student.Sex === sexFilter);
      }

      // programs
      filteredStudents = filteredStudents.filter(student => {
        return student.Programs.reduce((programsPrev, program) => {
          
          return programsPrev || Object.entries(programFilters).reduce((filterPrev, [filterName, filterValue]) => {
            
            if (!filterValue) {
              return filterPrev;
            }
            return filterPrev && program[filterName] === filterValue; // Because of this line

          }, true);
          
        }, false)
      });

      // courses
      filteredStudents = filteredStudents.filter(student => {
        return student.Courses.reduce((programsPrev, program) => {
          
          return programsPrev || Object.entries(courseFilters).reduce((filterPrev, [filterName, filterValue]) => { // had the wrong formGroup here
            
            if (!filterValue) {
              return filterPrev;
            }
            return filterPrev && program[filterName] === filterValue; // Because of this line

          }, true);
          
        }, false)
      });

      this.filteredStudents$.next(filteredStudents);
    });

    this.sexFilterControl.setValue('');
    this.programCategoryFilterControl.setValue('');
    this.programStatusFilterControl.setValue('');
    this.courseCategoryFilterControl.setValue(''); // missed this
    this.courseStatusFilterControl.setValue(''); // missed this
  }

  private getStudents() {
    return JSON.parse(`
    [
      {
          "StudentId": 1,
          "StudentName": "Student1",
          "Sex":"M",
          "Programs": [
              {
                  "StudentId": 1,
                  "ProgramName": "Java",
                  "ProgramCategory": "Engineering",
                  "ProgramStatus": "Full Time"
              },
              {
                  "StudentId": 1,
                  "ProgramName": "HR Management 2",
                  "ProgramCategory": "HR",
                  "ProgramStatus": "Part Time"
              },
              {
                  "StudentId": 1,
                  "ProgramName": "Accounting 1",
                  "ProgramCategory": "Finance",
                  "ProgramStatus": "Full Time"
              }
          ],
          "Courses": [
              {
                  "StudentId": 1,
                  "CourseName": "Java",
                  "CourseCategory": "Engineering",
                  "CourseStatus": "Full Time"
              },
              {
                  "StudentId": 1,
                  "CourseName": "HR Management 2",
                  "CourseCategory": "HR",
                  "CourseStatus": "Part Time"
              },
              {
                  "StudentId": 1,
                  "CourseName": "Accounting 1",
                  "CourseCategory": "Finance",
                  "CourseStatus": "Full Time"
              }
          ]
       },
      {
          "StudentId": 2,
          "StudentName": "Student2",
          "Sex":"F",
          "Programs": [
              {
                  "StudentId": 2,
                  "ProgramName": "HR Management 1",
                  "ProgramCategory": "HR",
                  "ProgramStatus": "Part Time"
              },
              {
                  "StudentId": 2,
                  "ProgramName": "Accounting 3",
                  "ProgramCategory": "Finance",
                  "ProgramStatus": "Full Time"
              }
          ],
          "Courses": [
              {
                  "StudentId": 2,
                  "CourseName": "HR Management 1",
                  "CourseCategory": "HR",
                  "CourseStatus": "Part Time"
              },
              {
                  "StudentId": 2,
                  "CourseName": "Accounting 3",
                  "CourseCategory": "Finance",
                  "CourseStatus": "Full Time"
              }
          ]
       },
      {
          "StudentId": 3,
          "StudentName": "Student3",
          "Sex":"F",
          "Programs": [
              {
                  "StudentId": 3,
                  "ProgramName": "Java 3",
                  "ProgramCategory": "Engineering",
                  "ProgramStatus": "Full Time"
              }
          ],
          "Courses": [
              {
                  "StudentId": 3,
                  "CourseName": "Java 3",
                  "CourseCategory": "Engineering",
                  "CourseStatus": "Full Time"
              }
          ]
       },
      {
          "StudentId": 4,
          "StudentName": "Student4",
          "Sex":"M",
          "Programs": [
              {
                  "StudentId": 4,
                  "ProgramName": "Java 2",
                  "ProgramCategory": "Engineering",
                  "ProgramStatus": "Full Time"
              },
              {
                  "StudentId": 4,
                  "ProgramName": "Accounting 2",
                  "ProgramCategory": "Finance",
                  "ProgramStatus": "Part Time"
              }
          ],
          "Courses": [
              {
                  "StudentId": 4,
                  "CourseName": "Java 2",
                  "CourseCategory": "Engineering",
                  "CourseStatus": "Full Time"
              },
              {
                  "StudentId": 4,
                  "CourseName": "Accounting 2",
                  "CourseCategory": "Finance",
                  "CourseStatus": "Part Time"
              }
          ]
       },
       {
          "StudentId": 5,
          "StudentName": "Student5",
          "Sex":"M",
          "Programs": [
              {
                  "StudentId": 5,
                  "ProgramName": "JavaScript",
                  "ProgramCategory": "Engineering",
                  "ProgramStatus": "Part Time"
              },
              {
                  "StudentId": 5,
                  "ProgramName": "HR Management 5",
                  "ProgramCategory": "HR",
                  "ProgramStatus": "Full Time"
              }
          ],
          "Courses": [
              {
                  "StudentId": 5,
                  "CourseName": "JavaScript",
                  "CourseCategory": "Engineering",
                  "CourseStatus": "Part Time"
              },
              {
                  "StudentId": 5,
                  "CourseName": "HR Management 5",
                  "CourseCategory": "HR",
                  "CourseStatus": "Full Time"
              }
          ]
       }
  ]
    `);
  }

}