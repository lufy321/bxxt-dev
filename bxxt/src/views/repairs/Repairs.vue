<template>
  <div class="repairs">
    <nav-bar>
      <template v-slot:left></template>
      <template v-slot:default>报修</template>
    </nav-bar>
    <div class="repairs-body">
      <div class="form">
        <van-form @submit="onSubmit">
          <van-cell-group>
            <van-field v-model="dormitory" is-link readonly label="宿舍" placeholder="请选择所在房间" @click="showRoom = true"
              :rules="[{ required: true, message: '请选择您的报修地点' }]" />
            <van-popup v-model:show="showRoom" round position="bottom">
              <van-cascader v-model="room" title="请选择所在地区" :options="roomOptions" @close="showRoom = false"
                @finish="onFinishRoom" />
            </van-popup>
            <van-field v-model="name" name="姓名" label="姓名" placeholder="姓名"
              :rules="[{ required: true, message: '请填写姓名' }]" />
            <van-field v-model="tel" type="tel" name="联系方式" label="联系方式" placeholder="联系方式" :rules="[
              { required: true, message: '请填写您的手机号码' },
              { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误' },
            ]" />
            <van-field v-model="reportContent" is-link readonly label="报修内容" placeholder="请选择报修项"
              @click="showRepair = true" :rules="[{ required: true, message: '请选择您的报修项' }]" />
            <van-popup v-model:show="showRepair" round position="bottom">
              <van-cascader v-model="repairItem" title="请选择报修项" :options="repairOptions" @close="showRepair = false"
                @finish="onFinishRepair" />
            </van-popup>

            <van-field v-model="message" rows="2" autosize label="留言" type="textarea" maxlength="50" placeholder="请输入留言"
              show-word-limit />

            <van-uploader class="upload" v-model="fileList" multiple />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" color="#44b883" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { addForm, upLoad } from "network/form";
import { getOption, getSiteOption } from "network/option";
import HomeSwiper from "views/home/ChildComps/HomeSwiper";
import { ref, reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Dialog, Toast } from "vant";
import NavBar from "../../components/common/navbar/NavBar";
import { formatDate } from "utils/Time";

export default {
  name: "Repairs",
  components: {
    HomeSwiper,
    NavBar,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formData = reactive({
      dormitory: "",
      name: "",
      tel: "",
      reportContent: "",
      message: "",
      staus: 0,
      repairsUser: store.state.user.username,
    });
    const room = ref("");
    const repairItem = ref("");
    const showRoom = ref(false);
    const showRepair = ref(false);
    let roomOptions = ref([]);
    let repairOptions = ref([]);
    // 全部选项选择完毕后，会触发 finish 事件
    const onFinishRoom = ({ selectedOptions }) => {
      showRoom.value = false;
      formData.dormitory = selectedOptions
        .map((option) => option.text)
        .join("/");
    };
    const onFinishRepair = ({ selectedOptions }) => {
      showRepair.value = false;
      formData.reportContent = selectedOptions
        .map((option) => option.text)
        .join("/");
    };

    const fileList = ref([]);
    let imagesUrl = ref("");

    const onSubmit = () => {
      let Images = new FormData();
      for (let i = 0; i < fileList.value.length; i++) {
        Images.append("images", fileList.value[i].file);
      }
      Dialog.confirm({
        title: "确认提交",
        message: "是否确认提交，一旦提交无法撤回！",
      })
        .then(async () => {
          Toast.loading({
            duration: 0,
            message: '提交中...',
            forbidClick: true,
          })
          await upLoad(Images).then(({ data }) => {
            console.log(data[0]);
            for (let i = 0; i < data.length; i++) {
              console.log(data[i]); 
              imagesUrl.value +=
                data[i].destination.replace(".","api") +
                "/" +
                data[i].filename +
                ",";
            }
            if (imagesUrl.value.length > 0) {
              console.log("test");
              imagesUrl.value = imagesUrl.value.substr(
                0,
                imagesUrl.value.length - 1
              );
            }
            console.log(imagesUrl.value);
          });

          formData["imagesUrl"] = imagesUrl.value;
          formData["createTime"] = formatDate();
          addForm(formData).then((res) => {
            console.log(res);
            Toast.clear();
            Toast.success("添加成功！");
            router.replace({ path: "/show" });
          }).catch(() => {
            Toast.clear();
            Toast.fail("添加失败!");
          })
        })
        .catch(() => {
          // on cancel
        });
    };

    onMounted(() => {
      getOption().then((res) => {
        repairOptions.value = res.data;
      });
      getSiteOption().then((res) => {
        roomOptions.value = res.data;
      });
    });

    return {
      repairItem,
      room,
      fileList,
      ...toRefs(formData),
      onSubmit,
      showRoom,
      showRepair,
      roomOptions,
      repairOptions,
      onFinishRoom,
      onFinishRepair,
    };
  },
};
</script>

<style scoped>
.upload {
  margin-top: 5px;
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}

.repairs-body {
  margin-top: 45px;
  margin-bottom: 50px;
}
</style>