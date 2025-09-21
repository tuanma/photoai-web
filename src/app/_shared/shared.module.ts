import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent} from '../_components';
import { PipeModule } from '../_helpers/pipes/pipe.module';
import { ScrollTrackerDirective } from '../_helpers/scroll-tracker.directive';

const components = [
	AlertComponent, ScrollTrackerDirective
];
const modules = [
	PipeModule, ReactiveFormsModule, FormsModule
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ...modules],
  exports: [...components]
})
export class SharedComponentModule {}