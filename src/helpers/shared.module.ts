import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from 'ionic-angular';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import { RelativeTime } from './relative.time'; 
@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule.forChild()
    ],
    declarations: [ProgressBarComponent, RelativeTime],
    exports: [ProgressBarComponent, RelativeTime, TranslateModule],
})

export class SharedModule {}