<template>
   <v-app style="background: #7b7b7b">
      <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" :disable-resize-watcher="true" fixed app>
         <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
               <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
               </v-list-item-action>
               <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
               </v-list-item-content>
            </v-list-item>
         </v-list>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app style="background: #424242">
         <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
         <v-btn icon @click.stop="miniVariant = !miniVariant">
            <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
         </v-btn>

         <v-toolbar-title v-text="title" />
         <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="green"></v-progress-linear>
         <v-spacer />
      </v-app-bar>
      <v-main>
         <v-container>
            <Nuxt />
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
export default {
   name: 'DefaultLayout',
   data() {
      return {
         loading: true,
         clipped: false,
         drawer: false,
         fixed: false,
         items: [
            {
               icon: 'mdi-home',
               title: 'Market',
               to: '/',
            },
         ],
         miniVariant: false,
         right: true,
         rightDrawer: false,
         title: 'Drone Shop',
      }
   },
   mounted() {
      // Loading bard just fancy
      setTimeout(() => (this.loading = false), 2000)
   },
}
</script>
