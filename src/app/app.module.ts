import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouteModule } from './route.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './home/header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsComponent } from './home/posts/posts.component';
import { SuggestionsComponent } from './home/posts/suggestions/suggestions.component';
import { SuggestionsDetailsComponent } from './home/posts/suggestions-details/suggestions-details.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SharepostComponent } from './home/posts/sharepost/sharepost.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './deploy_content/admin.component';
import { LinkedinComponent } from './deploy_content/linkedin/linkedin.component';
import { NewsArticleComponent } from './deploy_content/news-article/news-article.component';

import { NgToastModule } from 'ng-angular-popup';
import { CustomPostsComponent } from './deploy_content/custom-posts/custom-posts.component';
import { AdminConfigComponent } from './admin-config/admin-config.component';
import { WidgetDataComponent } from './widget-data/widget-data.component';
import { AdminAnalyticsComponent } from './admin-analytics/admin-analytics.component';
import { SharedHistoryComponent } from './shared-history/shared-history.component';
import { ArchiveDataComponent } from './archive-data/archive-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    LoaderComponent,
    SidebarComponent,
    PostsComponent,
    SuggestionsComponent,
    SuggestionsDetailsComponent,
    SharepostComponent,
    AdminComponent,
    LinkedinComponent,
    NewsArticleComponent,
    CustomPostsComponent,
    AdminConfigComponent,
    WidgetDataComponent,
    AdminAnalyticsComponent,
    SharedHistoryComponent,
    ArchiveDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    RouteModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgToastModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch()), provideClientHydration(),
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
