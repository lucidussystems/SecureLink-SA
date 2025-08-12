#!/bin/bash

# Array of page names
pages=("incidents" "incident-details" "report-incident" "emergency-details" "emergency-history" "profile" "settings")

# Create each page
for page in "${pages[@]}"; do
    echo "Creating $page page..."
    
    # Create .ts file
    cat > "src/app/pages/$page/$page.page.ts" << EOF
import { Component } from '@angular/core';

@Component({
  selector: 'app-$page',
  templateUrl: './$page.page.html',
  styleUrls: ['./$page.page.scss'],
})
export class ${page^}Page {
  constructor() {}
}
EOF

    # Create .html file
    cat > "src/app/pages/$page/$page.page.html" << EOF
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>${page^}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <div class="ion-padding">
    <h1>${page^} Page</h1>
    <p>${page^} functionality coming soon...</p>
  </div>
</ion-content>
EOF

    # Create .scss file
    cat > "src/app/pages/$page/$page.page.scss" << EOF
// ${page^} page styles
EOF

    # Create .module.ts file
    cat > "src/app/pages/$page/$page.module.ts" << EOF
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ${page^}PageRoutingModule } from './$page-routing.module';
import { ${page^}Page } from './$page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ${page^}PageRoutingModule
  ],
  declarations: [${page^}Page]
})
export class ${page^}PageModule {}
EOF

    # Create routing module
    cat > "src/app/pages/$page/$page-routing.module.ts" << EOF
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ${page^}Page } from './$page.page';

const routes: Routes = [
  {
    path: '',
    component: ${page^}Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ${page^}PageRoutingModule {}
EOF

done

echo "All pages created successfully!"
