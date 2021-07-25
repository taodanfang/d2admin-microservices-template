<template>
  <d2-container type="full" class="overflow-y-scroll">
    <div class="container mx-auto mt-4 mb-4">
      <el-card>
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="products"
        >
        </d2-crud>
      </el-card>
    </div>
  </d2-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'page11',
  data: function () {
    return {
      columns: [
        { title: 'ID', key: 'id', width: '40'},
        { title: '名称', key: 'title' },
        { title: '价格', key: 'price', width: '80'},
        { title: '库存', key: 'stock', width: '80'},
        { title: '销量', key: 'saleCount', width: '80'},
      ],
    }
  },
  computed: {
    ...mapGetters('demo/product', ['products'])
  },

  methods: {
    async get_all_products() {
       await this.$store.dispatch("demo/product/get_all_products");
    }
  },

  async mounted () {
    await this.get_all_products();
  }
}
</script>

