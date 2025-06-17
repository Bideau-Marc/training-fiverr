import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { AddReceipe } from './add-receipe/add-receipe';
import { UpdateReceipe } from './update-receipe/update-receipe';
import { DeleteReceipe } from './delete-receipe/delete-receipe';

export const routes: Routes = [
    {
        path: '', component: HomePage,
    },
    {
        path: 'add', component: AddReceipe,
    },
    {
        path: 'update', component: UpdateReceipe,
    },
    {
        path: 'delete', component: DeleteReceipe,
    },

];
