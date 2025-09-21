import { Injectable } from '@angular/core';

interface DateStruct {
    year: number;
    month: number;
    day: number;
}

@Injectable({ providedIn: 'root' })
export class UtilsService {

    constructor(
    ) {
    }

	yyyyMMdd(date: DateStruct) {
        return new Date(date.year + "-" + date.month + "-" + (date.day+1))
    }

    public arrIndexOf( arr: any, str: string ) {
        let index = -1;
        for ( var i = 0; i < arr.length; i++ ) {
            index = str.indexOf( arr[i] );
            if ( index > - 1 ) {
                return index;
            }
        }
    }

    public isObject( item ) {
        return ( typeof item === "object" && !Array.isArray( item ) && item !== null );
    }
    public getFlag( lang ) {
        if(lang == 'en' || lang == null || this.isEmpty(lang)){
            return '<i class="flag-icon flag-icon-gb"></i> English';
        }else if(lang == 'vi'){
            return '<i class="flag-icon flag-icon-vn"></i> Vietnames';
        }else if(lang == 'kr'){
            return '<i class="flag-icon flag-icon-kr"></i> Korea';
        }
    }

    public merge( objDst: any, objSrc: any ) {
        for ( var prop in objDst ) {
            if ( objDst.hasOwnProperty( prop ) && objSrc.hasOwnProperty( prop ) && objSrc[prop] != null ) {
                objDst[prop] = objSrc[prop];
            }
        }
        return objDst;
    }

    public trim( f: string ) {
		if(f)
        	return f.replace(/\s+/g, ' ').trim();
		return f;
    }
    public isEmpty( s: any ) {
        return ( s === null || s === '' || s === ' ' )
    }

    public getStringFromNull( s: string ) {
        if ( s == null || s == undefined ) {
            s = "";
        }

        return s;
    }

	public toFormData<T>( formValue: T ) {
	  const formData = new FormData();
	
	  for ( const key of Object.keys(formValue) ) {
	  const value = formValue[key];
	  formData.append(key, value);
	  }
	
	  return formData;
	}
	
	public blobToFile(fileName: string) {
		var myBlob = new Blob();
        return new File([myBlob], fileName, { lastModified: new Date().getTime(), type: myBlob.type })
    }

	isName(value: any) {
		if(value){
			let str = value.replace(/[^\x00-\x7F]/g, "")
	    	return /^[a-zA-Z ]+$/.test(str);
		}
	}
	isNumeric(value: any) {
		if(value){
	    	return /^-?\d+$/.test(value);
		}
	}

	validateCode(value: string) 
	{
	     if(value){
			var re = /^[a-zA-Z0-9\s]{6,6}$/;
	     	return re.test(value);
		}
	}
	validatePassword(password: string) 
	{
	     var re = /^(?=.*[A-Za-z@#!])(?=.*\d)[A-Za-z@#!\d]{6,20}$/;
	     return re.test(password);
	}
	validateEmail(email: string) 
	{
	     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	     return re.test(email);
	}
	
	validateEmail2(email: string) 
	{
	     var re2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	     return re2.test(email);
	}

	dateToYMD(date) {
    	var d = date.getDate();
	    var m = date.getMonth()+1; //Month from 0 to 11
	    var y = date.getFullYear();
	    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
	}

	
	validatePhone(phone: string)
	{
		if(phone){
	    	//var re = /^(\+\d{3})?\d{9}$/;
	    	var re = /((09|03|07|08|05)+([0-9]{8})\b)/;
	    	return re.test(phone.replace(/\s+/g, ''));
		}
		return false
	}
	validateUsername(username: string) {
		if(username){
			let str = username.toLowerCase()
			let re = /[0-9a-z_@]/;
			return re.test(str.replace(/\s+/g, ''))
		}
		return false
	}
	isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

	formatCash(str) {
	 	return str.split('').reverse().reduce((prev, next, index) => {
	 		return ((index % 3) ? next : (next + ',')) + prev
	 	})
	}
	
	formatCashVn (labelValue) 
	{
	    // Nine Zeroes for Billions
	    return Math.abs(Number(labelValue)) >= 1.0e+9
	
	    ? Math.abs(Number(labelValue)) / 1.0e+9 + " tỷ"
	    // Six Zeroes for Millions 
	    : Math.abs(Number(labelValue)) >= 1.0e+6
	
	    ? Math.abs(Number(labelValue)) / 1.0e+6 + " triệu"
	    // Three Zeroes for Thousands
	    : Math.abs(Number(labelValue)) >= 1.0e+3
	
	    ? Math.abs(Number(labelValue)) / 1.0e+3 + " nghìn"
	
	    : Math.abs(Number(labelValue));
	}
	
	// Javascript function to check TLD.
	domainCheck(dom) {
	    // convert input to lowercase.
	    let d = dom.toLowerCase();
	    // find the first occurance of '.'
	    let pos = d.indexOf(".");
	    // Using the first occurance of '.'
	    // find the extension submitted.
		let tld = d.substring(pos);
	    switch(tld) {
	        // TLD's to accept.
	        case '.com': return true; break;
	        case '.co.uk': return true; break;
	        case '.eu': return true; break;
	        case '.io': return true; break;
	        case '.co': return true; break;
	        case '.net': return true; break;
	        default: return false;
	    }
	}
	
	dayOfAgo(current, n) {
	    var week= new Array(); 
	    for (var i = 0; i < n; i++) {
	        week.push(
	            new Date(current)
	        ); 
	        current.setDate(current.getDate() + 1);
	    }
	    return week; 
	}
	dayOfWeek(current) {
	    var week= new Array(); 
	    // Starting Monday not Sunday
	    current.setDate((current.getDate() - current.getDay() +1));
	    for (var i = 0; i < 7; i++) {
	        week.push(
	            new Date(current)
	        ); 
	        current.setDate(current.getDate() +1);
	    }
	    return week; 
	}
	getMonday(d) {
		d = new Date(d);
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}
}