import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingFeedbackComponent } from './components/loading-feedback/loading-feedback.component';
import { IonicModule } from '@ionic/angular';

const EXPORTED_DECLARATIONS = [LoadingFeedbackComponent];
const EXPORTED_IMPORTS = [];

@NgModule({
  declarations: [...EXPORTED_DECLARATIONS],
  exports: [...EXPORTED_DECLARATIONS, ...EXPORTED_IMPORTS],
  imports: [CommonModule, IonicModule, ...EXPORTED_IMPORTS]
})
export class SharedModule {}
