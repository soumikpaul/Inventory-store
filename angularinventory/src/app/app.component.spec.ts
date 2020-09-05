import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { TestComponent } from './test/test.component';
import { Component } from '@angular/core';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'my-dream-app'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('Inventory Management System!');
  // });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Inventory Management System!');
  });

}
);

// describe('Component:ListComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule
//       ],
//       declarations: [
//         ListComponent
//       ],
//     }).compileComponents();
//   }))
//   it('should create the list component',()=>{
//     let fixture = TestBed.createComponent(ListComponent);
//     let app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });
// })

// describe('Component :TestComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule
//       ],
//       declarations: [
//         TestComponent
//       ],
//     }).compileComponents();
//   }))
//   it('should create the test component',()=>{
//     let fixture = TestBed.createComponent(TestComponent);
//     let app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });
// })

