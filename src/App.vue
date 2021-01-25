<template>
    <v-app id="app" class="layout--off" color="gray-lighten2">
        <v-app-bar app color="indigo" dark clipped-left>
            <v-toolbar-title class="title">{{ title }}</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <v-container class="demo mt-10">
                <v-row align="start" justify="start">
                    <v-col class="component" cols="8">
                        Component, 8 cols
                        <hello-world></hello-world>
                    </v-col>
                    <v-col class="ui" cols="4">
                        UI, 4 cols
                        <v-btn text small color="primary">Primary</v-btn>
                    </v-col>
                </v-row>
                <v-row align="start" justify="start" no-gutters>
                    <v-col class="log pa-2" cols="12">
                        Log, 12 cols
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <v-footer fixed dark>
            <v-spacer></v-spacer>
            <span class="version">V {{ version }}</span>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import HelloWorld from './components/HelloWorld.vue';

    @Component({ components: { HelloWorld } })
export default class App extends Vue {
    private get title(): string {
        return process.env.VUE_APP_TITLE || '<process.env.VUE_APP_TITLE = undefined>';
    }
    private get version(): string {
        return process.env.VUE_APP_VERSION || '<process.env.VUE_APP_VERSION = undefined>';
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#app {
    .demo {
        border-radius: 5px;
        border: 2px solid #d9d9d9;
        background-color: #f7f7f7;

        .log {
            min-height: 300px;
            border: 2px solid black;

            color: white;
            background-color: #3f3f3f;
        }
    }
}
footer {
    .version {
        font-size: small;
    }
}
</style>
