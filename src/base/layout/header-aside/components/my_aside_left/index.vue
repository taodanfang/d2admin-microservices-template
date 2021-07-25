<template>
    <div slot="message_aside">
        <div class="d2-message-container" flex="dir:top main:justify box:last">
            <div class="d2-message-container--header">
                <el-tabs
                    v-model="data_ui_tab_current_selected"
                    @tab-click="on_click_tabs"
                    type="border-card"
                    style="max-height: 40px; border-bottom: 0px solid white;">

                    <el-tab-pane label="管理" name="管理"></el-tab-pane>

                </el-tabs>
            </div>

            <div class="d2-message-container--body">

                <div class="overflow-y-scroll h-full bg-gray-200" v-show="this.data_ui_tab_current_selected === '管理'">
                  <div>
                    <d2-menu-side/>
                  </div>
                </div>


            </div>

            <div
              class="d2-message-container--footer">
              <div>
                <div class="flex flex-col relative mt-0">
                  <div class="absolute flex items-center justify-center h-10 w-10 left-0 top-0">
                    <svg class="h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <input class="pl-10 rounded h-10 w-full focus:outline-none bg-gray-200 focus:bg-gray-300" type="text" />
                  </div>
                </div>
              </div>
            </div>

        </div>

    </div>
</template>

<script>
import d2MenuSide from '@/base/layout/header-aside/components/menu-side'

export default {
  components: {
    d2MenuSide
  },
  computed: {

  },

  data () {
    return {
      data_ui_tab_current_selected: '管理',
      data_dlg_job_updated: false
    }
  },

  methods: {
    on_click_tabs: function (tab, event) {
      this.data_ui_tab_current_selected = tab.label

      switch (this.data_ui_tab_current_selected) {
        case '管理':
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.d2-message-container {
    @extend %full;

    background: white;

    .d2-message-container--header {
        max-height: 41px;

        padding: 0px;
        text-align: center;
        border-bottom: 1px solid lightgrey;
    }

    .d2-message-container--body {
        padding: 0px;
        background: white;
    }

    .d2-message-container--footer {
        border-top: 1px solid lightgrey;
        padding: 10px;
    }
}

::v-deep .el-tabs--border-card {
    border: 1px solid #ebf1f6;
    box-shadow: none;
    background: #ebf1f6;
}

</style>

<style lang="scss" scoped>

::v-deep div.d2-message-container--footer {
    padding-left: 10px !important;
    padding-right: 10px !important;
}

</style>


