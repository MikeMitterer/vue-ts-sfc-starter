<template>
    <div>
        Hello World! Prop:
        <span class="prop" :class="{ active: status }">{{ status }}</span>
        <v-btn text small color="primary" @click="onClick">Click me!</v-btn>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { VBtn } from 'vuetify/lib';

@Component({ name: 'HelloWorld', components: { VBtn } })
export default class HelloWorld extends Vue {
    // private readonly logger = loggerFactory.getLogger('<package>');

    @Prop({ default: false })
    private myProp!: boolean;

    private status: boolean = this.myProp;

    private onClick(): void {
        this.status = !this.status;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$color: #ff0000;

.prop-mike {
    color: $color;

    &.active {
        color: green;
    }
}
</style>
