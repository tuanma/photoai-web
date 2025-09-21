import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
    name: 'sorting'
} )
export class SortingTablePipe implements PipeTransform {

    transform( items: any[], path: string[], order: number = 1 ): any[] {

        // Check if is not null
        if ( !items || !path || !order ) return items;

        return items.sort(( a: any, b: any ) => {
            path.forEach( property => {
                a = a[property];
                b = b[property];
            } )
            return a > b ? order : order * ( - 1 );
        } )
    }

}