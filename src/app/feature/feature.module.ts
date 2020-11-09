import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature.component';
import { FeatureHomeComponent } from './feature-home/feature-home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FeatureComponent, FeatureHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
      path: '',
      component: FeatureComponent,
      children: [{
        path: '',
        component: FeatureHomeComponent
      },
        {
          path: 'child',
          loadChildren: () => import('./feature-child/feature-child.module').then(m => m.FeatureChildModule)
        }
      ]
    }
  ])
  ]
})
export class FeatureModule { }
