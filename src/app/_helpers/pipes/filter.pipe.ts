import { Pipe, PipeTransform } from '@angular/core';
@Pipe( {
    name: 'filter'
} )
export class FilterPipe implements PipeTransform {
    transform( items: any[], searchText: string, obj: string ): any[] {
        if ( !items ) return [];
        if ( !searchText ) return items;
        
        console.log("obj:" + obj)
        
        if(obj == 'name'){
            console.log(searchText)
            console.log(items)
            searchText = searchText.toLowerCase();
            return items.filter( it => {
                console.log(it)
                return it.name.toLowerCase().includes( searchText );
            } );
        }
    }
}