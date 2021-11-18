import { Routes } from "@angular/router";
import { AdminMenuComponent } from "./components/admin-menu/admin-menu.component";
import { ProfilsComponent } from "./components/admin/profils/profils.component";
import { UsersComponent } from "./components/admin/users/users.component";
import { ConfirmComponent } from "./components/auth/confirm/confirm.component";
import { ForgotPasswordComponent } from "./components/auth/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { ResetPasswordComponent } from "./components/auth/reset-password/reset-password.component";


const appRoutes: Routes = [
	{
    path: '',
    component: LoginComponent,
    
	},
	{
    path: 'register',
    component: RegisterComponent,
    
	},
	{
		path: 'account',
		children: [
			{
				path: 'password_recovery',
				component: ForgotPasswordComponent
			},
			{
				path: 'reset_password',
				component: ResetPasswordComponent
			},
			{
				path: 'confirm',
				component: ConfirmComponent
			},
		]
	},
	// {
	// 	path: 'login',
	// 	component: LoginComponent
	// },
	{
		path: 'admin',
		component: AdminMenuComponent,
		// canActivate: [AuthGuard, RoleBaseGuard], 
		children:[
		{
			path:'users',
			component: UsersComponent
		},
		{
			path:'profils',
			component: ProfilsComponent
		}
		]
	},
	{
		path: '',
		children: [
		  {
			path: 'ci-pme',
			loadChildren: () =>
			  import('./components/ci-pme/ci-pme.module').then(m => m.CiPmeModule)
		  }
		]
	  },
];

export default appRoutes;
