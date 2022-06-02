<template>
  <div>
    <Header></Header>
    <div class="mainbody">
      <left-side></left-side>
      <router-view></router-view>
    </div>
    <Footer></Footer>

  </div>

</template>

<script>
import LeftSide from '../components/leftSide.vue';
import myEvent from '../components/myEvent.vue';
import Footer from './footer/footer.vue';
import Header from './header/header.vue';
export default {
  name: "Main",
  components: {LeftSide,myEvent, Header, Footer},
}
</script>

<style scoped lang="scss">
  .mainbody{
    width: 1500px;
    height: 781px;
  }

</style>
