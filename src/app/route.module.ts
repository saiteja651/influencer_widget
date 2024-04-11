import { Routes,RouterModule} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { canActivate } from "./auth.guard";
import { AdminComponent } from "./deploy_content/admin.component";
import { AdminConfigComponent } from "./admin-config/admin-config.component";
import { WidgetDataComponent } from "./widget-data/widget-data.component";
import { AdminAnalyticsComponent } from "./admin-analytics/admin-analytics.component";
import { SharedHistoryComponent } from "./shared-history/shared-history.component";
import { ArchiveDataComponent } from "./archive-data/archive-data.component";
const routes:Routes=[
    {path:'home',component:HomeComponent,canActivate:[canActivate]},
    {path:'build_widget',component:AdminComponent,canActivate:[canActivate]},
    {path:"admn_confg",component:AdminConfigComponent,canActivate:[canActivate]},
    {path:"widget_data",component:WidgetDataComponent,canActivate:[canActivate]},
    {path:"admn_analytics",component:AdminAnalyticsComponent,canActivate:[canActivate]},
    {path:"shared_history",component:SharedHistoryComponent,canActivate:[canActivate]},
    {path:"archive_data",component:ArchiveDataComponent,canActivate:[canActivate]},
    {path:'',component:LoginComponent}
]
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers:[]
})
export class RouteModule{

}