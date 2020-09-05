import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TestComponent } from './test/test.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ChartComponent } from './chart/chart.component';
const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'list', component: ListComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'delete', component:DeleteComponent },
  { path: 'chart', component: ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [TestComponent, ListComponent, UpdateComponent, DeleteComponent,ChartComponent];

