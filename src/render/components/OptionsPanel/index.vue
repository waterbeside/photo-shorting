<template>
  <section class="options-panel">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="旋转">
        <a-slider
          v-model:value="formState.rotate"
          :min="0"
          :max="270"
          :step="90"
          :marks="marks"
          class="rotate-slider"
        />
      </a-form-item>

      <a-form-item label="保存路径">
        <SelectDirBtn v-model:value="formState.dirPath">
          <span>{{ formState.dirPath ? formState.dirPath : '选择文件夹' }}</span> <FolderOutlined />
        </SelectDirBtn>

        <a-input v-model:value="formState.dirPath" placeholder="请选择路径" type="hidden" />
      </a-form-item>
      <a-form-item label="DPI">
        <a-select v-model:value="formState.dpi" placeholder="DPI">
          <a-select-option value="72">72</a-select-option>
          <a-select-option value="96">96</a-select-option>
          <a-select-option value="300">300</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="是否更尺寸">
        <a-switch v-model:checked="formState.isChangeSize" />
      </a-form-item>

      <!-- <a-form-item label="固定比例">
        <a-switch v-model:checked="formState.isFixWh" />
      </a-form-item> -->

      <a-form-item label="尺寸" class="wh-wrapper">
        <a-row :gutter="[8, 8]">
          <a-col>
            <a-tooltip placement="left">
              <template #title>
                <span>宽 (px)</span>
              </template>
              <a-input
                v-model:value="formState.width"
                placeholder="Width"
                type="number"
                :disabled="formState.autoWidth"
                class="input"
              >
              </a-input>
            </a-tooltip>
          </a-col>
          <a-col>
            <a-checkbox v-model:checked="formState.autoWidth" size="small">自动</a-checkbox>
          </a-col>
        </a-row>
        <a-row :gutter="[8, 8]">
          <a-col>
            <a-tooltip placement="left">
              <template #title>
                <span>高 (px)</span>
              </template>
              <a-input
                v-model:value="formState.height"
                placeholder="Height"
                type="number"
                :disabled="formState.autoHeight"
                class="input"
              >
              </a-input>
            </a-tooltip>
          </a-col>
          <a-col>
            <a-checkbox v-model:checked="formState.autoHeight" size="small">自动</a-checkbox>
          </a-col>
        </a-row>
      </a-form-item>
      <div class="btn-bar">
        <a-button class="submit-btn" type="primary" @click="handleOk">
          <SvgIcon class="icon" name="photo" />
          处理当前
        </a-button>
        <a-button class="batch-submit-btn" type="primary" @click="handleBatchOk">
          <SvgIcon class="icon" name="photos" />
          批量处理
        </a-button>
      </div>
    </a-form>
  </section>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRaw, PropType, watch, UnwrapRef } from 'vue'
  import {
    Form,
    Button,
    Input,
    Select,
    Switch,
    Slider,
    Row,
    Col,
    Checkbox,
    Tooltip
  } from 'ant-design-vue'
  import SelectDirBtn from '../SelectDirBtn.vue'
  import { FolderOutlined } from '@ant-design/icons-vue'
  import SvgIcon from '../SvgIcon.vue'

  export interface OptionsData {
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
      AForm: Form,
      AFormItem: Form.Item,
      AButton: Button,
      AInput: Input,
      ASelect: Select,
      ASelectOption: Select.Option,
      ASwitch: Switch,
      ASlider: Slider,
      ARow: Row,
      ACol: Col,
      ACheckbox: Checkbox,
      ATooltip: Tooltip,
      SelectDirBtn,
      FolderOutlined,
      SvgIcon
    },
    props: {
      data: {
        type: Object as PropType<OptionsData>,
        default: () => []
      }
    },
    emits: ['update:data', 'click-ok', 'click-batch-ok'],
    setup(props, ctx) {
      // data
      const formState: UnwrapRef<OptionsData> = reactive(props.data)
      const marks = reactive({
        0: '0°',
        90: '90°',
        180: '180°',
        270: '270°'
      })

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
      }

      const handleBatchOk = () => {
        ctx.emit('click-batch-ok', toRaw(formState))
      }

      return {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
        formState,
        marks,
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
    .wh-wrapper {
      .input {
        width: 140px;
      }
    }
    .btn-bar {
      position: fixed;
      background: #555;
      padding: 4px;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: right;
      .submit-btn {
        margin-right: 4px;
      }
      .icon {
        margin-right: 4px;
        transform: translateY(2px);
      }
    }
  }
</style>
