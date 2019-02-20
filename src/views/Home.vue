<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>内置acme：{{$acme.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')}}</div>
    <div>内置util：{{$util.number.getPercent(78.796,1)}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    // this.$api.helloAPI
    //   .testjsonp()
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(e => {
    //     console.log('error', e.message);
    //   });

    // this.$api.helloAPI
    //   .getSearchInfo({ datnum: 45 })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(e => {
    //     console.log(e.message);
    //   });

    this.$api.helloAPI
      .testDevServer()
      .then(res => {
        console.log(res, "测试mock-server success");
      })
      .catch(e => {
        console.log(e, "模拟数据服务未运行 请至yapi平台中配置模拟数据接口");
      });
  }
};
</script>
<style>
</style>




