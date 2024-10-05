import { SallesModule } from './salles/salles.module';
import { EncadrementEtudiantComponent } from './encadrement-etudiant/encadrement-etudiant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DemandesComponent } from './demandes/demandes.component';
import { ConventionComponent } from './convention/convention.component';
import { DocumentsComponent } from './documents/documents.component';
import { EntreprisesComponent } from './entreprises/entreprises.component';
import { EncadrementEnseignantComponent } from './encadrement-enseignant/encadrement-enseignant.component';
import { SfeEtudiantComponent } from './sfe-etudiant/sfe-etudiant.component';
import { SfeEnseignantComponent } from './sfe-enseignant/sfe-enseignant.component';
import { FilesComponent } from './files/files.component';
import { SoutenancesComponent } from './soutenances/soutenances.component';
import { SoutenancesEtudComponent } from './soutenances-etud/soutenances-etud.component';
import { SoutenancesEnsComponent } from './soutenances-ens/soutenances-ens.component';
import { CompteComponent } from './compte/compte.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'demandes', component: DemandesComponent },
  { path: 'etudiants', loadChildren: () => import('./etudiants/etudiants.module').then(m => m.EtudiantsModule) },
  { path: 'enseignants', loadChildren:() => import('./enseignants/enseignants.module').then(m => m.EnseignantsModule)},
  { path: 'departments', loadChildren:() => import('./departments/departments.module').then(m => m.DepartmentsModule)},
  { path: 'sfes', loadChildren:() => import('./sfes/sfes.module').then(m => m.SfesModule)},
  { path: 'salles', loadChildren:() => import('./salles/salles.module').then(m => m.SallesModule)},
  { path: 'encadrement/etudiant',component: EncadrementEtudiantComponent},
  { path: 'encadrement/enseignant',component: EncadrementEnseignantComponent},
  { path: 'sfe/etudiant',component: SfeEtudiantComponent},
  { path: 'sfe/enseignant',component: SfeEnseignantComponent},
  { path: 'convention', component: ConventionComponent},
  { path: 'documents', component: DocumentsComponent},
  { path: 'files', component: FilesComponent},
  { path: 'entreprises', component: EntreprisesComponent},
  { path: 'soutenances', component: SoutenancesComponent},
  { path: 'soutenances/etudiant', component: SoutenancesEtudComponent},
  { path: 'soutenances/enseignant', component: SoutenancesEnsComponent},
  { path: 'compte',component:CompteComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
