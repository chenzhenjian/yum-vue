<style>

</style>

<template>
  <div class="custom-tag-wrapper">
      <el-popover trigger="hover" placement="top" v-for="(item, index) in manData" :key="index" :disabled="item.type==tagCfg.disableType">
        <slot name="content" :item="item"></slot>
        <div slot="reference" class="name-wrapper">
          <el-tag 
            :class="computeClass(item)"
            :closable="tagCfg.closable"
            :disable-transitions="tagCfg['disable-transitions']"
            :color="tagCfg.color"
            :hit="tagCfg.hit"
            :size="tagCfg.size"
            @close="tagCfg.closeCb(item,index)"
            :type="chooseType(item.type)"
          >
            {{item.label}}
          </el-tag>
        </div>
      </el-popover>
  </div>
  
</template>
<script>
export default {
  name:'customTag',
  props: {
    data: {
      type: Array,
      required: true
    },
    tagCfg: {
     type:  Object,
     required: true
    }
  },
  data() {
    return {
      success: 'success',
      info: 'info',
      warning: 'warning',
      danger: 'danger',
      useTheme: true
    }
  },
  computed: {
    manData() {
      if(this.tagCfg.props){
        let label = this.tagCfg.props.label,
          type = this.tagCfg.props.type;
        this.data.forEach((v, i) => {
          label?v.label = v[label]:null
          type?v.type = v[type]:null
        })
      }
      return this.data;
    }
  },
  methods: {
    chooseType(value) {
      if(!this.useTheme) {
        return
      }
      switch(value) {
        case this.success:
          return 'success'
        case this.info:
          return 'info'
        case this.warning:
          return 'warning'
        case this.danger:
          return 'danger'
      }
    },
    computeClass(item) {
      if(this.useTheme) {
        return this.tagCfg.class?this.tagCfg.class:''
      } else {
        if(item.hasOwnProperty('type')){
          return this.tagCfg.class? this.tagCfg.class+` tagtype-${item.type}` : `tagtype-${item.type}`
        }else {
          return this.tagCfg.class?this.tagCfg.class:''
        }
      }
    }
  },
  created() {
    if(this.tagCfg.props){
      this.tagCfg.props.success?this.success = this.tagCfg.props.success:null;
      this.tagCfg.props.info?this.info = this.tagCfg.props.info:null;
      this.tagCfg.props.warning?this.warning = this.tagCfg.props.warning:null;
      this.tagCfg.props.danger?this.danger = this.tagCfg.props.danger:null;
    }
    this.useTheme =  this.tagCfg.useTheme===false ? false : true;
  }  
}
</script>

