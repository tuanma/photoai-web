import { AbstractControl, ValidatorFn } from '@angular/forms'
 
function ageRangeValidator(min: number, max: number): ValidatorFn {
	
	//in the FormGroup set:
	//age: new FormControl(null, [ageRangeValidator(this.min, this.max)])
	
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
            return { 'ageRange': true };
        }
        return null;
    };
}