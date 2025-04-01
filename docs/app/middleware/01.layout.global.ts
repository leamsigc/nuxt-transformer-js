import { defineNuxtRouteMiddleware } from "#app";

export default defineNuxtRouteMiddleware(async (to) => {
    const routeStart = to.path
    const isUserNavigatingToTheApp = routeStart.startsWith('/app');
    const isBlog = routeStart.startsWith('/blog/');


    if (isUserNavigatingToTheApp) {
        setPageLayout('dashboard-layout');
    } else if (isBlog) {
        setPageLayout('blog-layout');
    }

});