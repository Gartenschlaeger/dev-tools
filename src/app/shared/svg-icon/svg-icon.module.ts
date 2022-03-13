import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DeleteIconComponent } from './delete-icon/delete-icon.component'
import { PlusIconComponent } from './plus-icon/plus-icon.component'

@NgModule({
    imports: [CommonModule],
    declarations: [DeleteIconComponent, PlusIconComponent],
    exports: [DeleteIconComponent, PlusIconComponent]
})
export class SvgIconModule {}
