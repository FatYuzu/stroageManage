<template>
     <!-- 编辑对话框 -->
    <el-dialog :title="编辑" :visible.sync="isShowUpload"
      ><el-upload
        class="upload-module"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
          <div class="el-upload__tip" slot="tip">支持批量上传</div>
        </div>
      </el-upload>
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle, (isShowEdit = false)">取消</el-button>
        <el-button @click="comfirm" type="primary">上传</el-button>
      </div>
    </el-dialog>
</template>
<script>
export default {
    name:'editDialog',
    props:{
        editFormLabel:Array,
        editForm:Array,
    },
    data() {
        return {
            
        }
    },
}
</script>