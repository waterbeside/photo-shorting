<template>
  <section class="options-panel" :class="[`${themeName}-theme`]">
    <n-form
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      label-placement="left"
      label-align="right"
      :label-width="80"
    >
      <n-form-item path="rotate" label="旋转" :show-require-mark="false">
        <n-slider
          v-model:value="formState.rotate"
          :min="0"
          :max="270"
          :step="90"
          :marks="marks"
          class="rotate-slider"
        />
      </n-form-item>

      <n-form-item path="dirPath" label="保存路径" :show-require-mark="false">
        <select-dir-btn v-model:value="formState.dirPath">
          <span>{{ formState.dirPath ? formState.dirPath : '选择文件夹' }}</span>
          <n-icon>
            <folder48-regular />
          </n-icon>
        </select-dir-btn>

        <!-- <n-input v-model:value="formState.dirPath" placeholder="请选择路径"  /> -->
      </n-form-item>
      <n-form-item path="dpi" label="DPI" :show-require-mark="false">
        <n-select
          v-model:value="formState.dpi"
          class="dpi-selecter"
          placeholder="DPI"
          :options="dpiOptions"
        ></n-select>
      </n-form-item>

      <n-form-item path="dpi" label="是否更尺寸" :show-require-mark="false">
        <n-switch v-model:value="formState.isChangeSize" />
      </n-form-item>

      <n-form-item
        v-show="formState.isChangeSize"
        path="width"
        label="尺寸"
        class="wh-wrapper"
        :show-require-mark="false"
      >
        <div class="row">
          <div class="col">
            <n-tooltip placement="left" trigger="hover">
              <template #trigger>
                <n-input-number
                  v-model:value="formState.width"
                  placeholder="Width"
                  :disabled="formState.autoWidth"
                  class="input"
                >
                </n-input-number>
              </template>
              <span>宽 (px)</span>
            </n-tooltip>
          </div>
          <div class="col">
            <n-checkbox v-model:checked="formState.autoWidth" size="small">自动</n-checkbox>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <n-tooltip placement="left" trigger="hover">
              <template #trigger>
                <n-input-number
                  v-model:value="formState.height"
                  placeholder="Height"
                  type="number"
                  :disabled="formState.autoHeight"
                  class="input"
                >
                </n-input-number>
              </template>
              <span>高 (px)</span>
            </n-tooltip>
          </div>
          <div class="col">
            <n-checkbox v-model:checked="formState.autoHeight" size="small">自动</n-checkbox>
          </div>
        </div>
      </n-form-item>
      <div class="btn-bar">
        <n-button-group>
          <n-button
            class="submit-btn"
            size="large"
            color="#08c570"
            :bordered="true"
            @click="handleOk"
          >
            <SvgIcon class="icon" name="photo" />
            处理当前
          </n-button>
          <n-button
            class="batch-submit-btn"
            size="large"
            type="primary"
            :bordered="true"
            @click="handleBatchOk"
          >
            <SvgIcon class="icon" name="photos" />
            批量处理
          </n-button>
        </n-button-group>
      </div>
    </n-form>
  </section>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRaw, PropType, watch, UnwrapRef } from 'vue'
  import { ipcRenderer } from '../../../utils'
  import SelectDirBtn from '../SelectDirBtn.vue'
  import SvgIcon from '../SvgIcon.vue'
  import { Folder48Regular } from '@vicons/fluent'
  import useTheme from '../../compositions/useTheme'
  import {
    NIcon,
    NForm,
    NFormItem,
    NSlider,
    NInputNumber,
    NSelect,
    NSwitch,
    NCheckbox,
    NTooltip,
    NButton,
    NButtonGroup
  } from 'naive-ui'

  export interface OptionsDataType {
    rotate: number
    dirPath: string
    dpi: number | undefined
    isChangeSize: boolean
    isFixWh: boolean
    width: number | undefined
    height: number | undefined
    autoWidth: boolean
    autoHeight: boolean
  }

  export default defineComponent({
    components: {
      Folder48Regular,
      SelectDirBtn,
      SvgIcon,
      NIcon,
      NForm,
      NFormItem,
      NSlider,
      // NInput,
      NInputNumber,
      NSelect,
      NSwitch,
      NCheckbox,
      NTooltip,
      NButton,
      NButtonGroup
    },
    props: {
      data: {
        type: Object as PropType<OptionsDataType>,
        default: () => []
      }
    },
    emits: ['update:data', 'click-ok', 'click-batch-ok'],
    setup(props, ctx) {
      // data
      const { themeName } = useTheme()
      const formState: UnwrapRef<OptionsDataType> = reactive(props.data)
      const marks = reactive({
        0: '0°',
        90: '90°',
        180: '180°',
        270: '270°'
      })

      const dpiOptions = reactive([
        {
          label: '72',
          value: 72
        },
        {
          label: '96',
          value: 96
        },
        {
          label: '300',
          value: 300
        }
      ])

      // watch
      watch(
        formState,
        (val: any) => {
          ctx.emit('update:data', val)
        },
        { deep: true }
      )

      // methods
      const handleOk = () => {
        ctx.emit('click-ok', toRaw(formState))
        ipcRenderer.send('run-selected-ok', toRaw(formState))
      }

      const handleBatchOk = () => {
        ctx.emit('click-batch-ok', toRaw(formState))
        const res = ipcRenderer.sendSync('run-batch-ok', toRaw(formState))
        console.log(res)
      }

      return {
        themeName,
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
        formState,
        marks,
        dpiOptions,
        handleOk,
        handleBatchOk
      }
    }
  })
</script>

<style lang="scss" scoped>
  .options-panel {
    text-align: left;
    padding: 20px 12px 50px;
    :deep(.select-dir-btn) {
      line-height: 1.4;
      word-break: break-all;
    }
    :deep(.ant-form-item) {
      margin-bottom: 12px;
    }
    .rotate-slider {
      max-width: 300px;
      width: 90%;
    }

    .dpi-selecter {
      width: 140px;
    }

    .wh-wrapper {
      :deep(.n-form-item-blank) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .col {
          margin-right: 12px;
        }
      }
      .row + .row {
        margin-top: 12px;
      }
      .input {
        width: 140px;
      }
    }
    .btn-bar {
      position: absolute;
      padding: 4px;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: right;
      .submit-btn {
        margin-right: 4px;
      }
      .batch-submit-btn {
        margin-right: 4px;
      }
      .icon {
        margin-right: 4px;
        transform: translateY(-2px);
      }
    }
    &.dark-theme {
      background: #333;
    }
  }
</style>
