export default{
    state:{
        isShowUpload:false,
        idShowEdit:false
    },
    mutations:{
        openUpload(){
            console.log("ssss")
            state.isShowUpload=true
        },
        closeUpload(){
            state.isShowUpload=false
        },
        openEdit(){
            state.idShowEdit=true
        },
        closeEdit(){
            state.idShowEdit=false
        }
    }
}