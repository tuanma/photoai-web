import { AbstractControl, ValidationErrors } from '@angular/forms'
 
export function identityValidator(control: AbstractControl): ValidationErrors | null {
    let v = control.value;
	if(!(/^-?\d+$/.test(v))){
		return { 'incorrect': true}
	}else if(v && (v.length < 9 || v.length > 12)){
		return { 'incorrect': true}
	}
    return null
 	
}
