import { NgModule } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common'; 
import {IonicModule} from 'ionic-angular';
import {ProgressBarComponent} from '../components/progress-bar/progress-bar';

@NgModule({
    imports: [CommonModule, IonicModule, TranslateModule],
    declarations: [ProgressBarComponent],
    exports: [ProgressBarComponent, TranslateModule],
})

export class SharedModule {}