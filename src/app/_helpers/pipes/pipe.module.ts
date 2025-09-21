// Angular
import { NgModule } from '@angular/core';
import {
  CapitalizePipe,
  FilterPipe,
  RoundPipe,
  SafePipe,
  SortingTablePipe,
  TimingPipe, NumberWithCommasPipe, TruncatePipe
} from '../../_helpers/pipes';

const pipes = [
  SafePipe, CapitalizePipe, FilterPipe, RoundPipe, SortingTablePipe, TimingPipe, NumberWithCommasPipe, TruncatePipe
];

@NgModule({
	imports: [],
	exports:[
		...pipes,
	  ],
	declarations: [
		...pipes,
	]
})
export class PipeModule { }
