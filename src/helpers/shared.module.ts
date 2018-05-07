import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'; 
import {IonicModule} from 'ionic-angular';
import {ProgressBarComponent} from '../components/progress-bar/progress-bar';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule.forChild()
    ],
    declarations: [ProgressBarComponent],
    exports: [ProgressBarComponent, TranslateModule],
})

export class SharedModule {}